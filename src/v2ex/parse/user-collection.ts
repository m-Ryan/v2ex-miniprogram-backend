import cheerio from 'cheerio';

export async function parseUserCollection(html: string) {
  try {
    const $ = cheerio.load(html, {
      decodeEntities: false
    });

    // 获取列表数据
    const list = $('#Main .box .item').toArray().map(child => {
      const currentNode = $(child);
      const title = currentNode.find('.item_title a');
      const tag = currentNode.find('.topic_info .node');
      const user = currentNode.find('.topic_info strong a');
      const replayer = currentNode.find('.topic_info strong a').eq(1);
      const replayTime = currentNode
        .find('.topic_info')
        .text()
        .replace(/(.*)•\s+(.*)\s+•\s+/, '$2')
        .replace('最后回复来自', '')
        .replace(replayer ? replayer.text() : '', '')
        .replace(user.text(), '')
        .trim();
      return {
        title: title.text(),
        url: title.attr('href'),
        tag: {
          name: tag.text(),
          url: tag.attr('href'),
        },
        user: {
          avatar: currentNode.find('img').attr('src'),
          name: user.text(),
          url: user.attr('href'),
        },
        last_replay: {
          time: replayTime,
          user_name: replayer && replayer.text(),
          user_url: replayer && replayer.attr('href'),
        },
        replay_count: Number(
          currentNode.find('.count_livid')
            ? currentNode.find('.count_livid').text()
            : 0,
        ),
      };
    });
    return list;
    
  } catch (error) {
    console.log(error.message);
    return '';
  }
}
