import cheerio from 'cheerio';

export async function parseNode(html: string) {
  try {
    const $ = cheerio.load(html);
     // 获取tab数据
    const pageCount = Number($('#Main .box .page_normal').last().text() || 1)
    const slogans  = $('.node_info .f12').eq(1).text();
    const avatar = $('.node_avatar img').attr('src');
    const relativeParentNodes = $('#Rightbar .box').eq(2);
    const relativeNodes = relativeParentNodes.find('.inner a').toArray().map((child, index)=>{
      const url = $(child).attr('href');
      const name = $(child).text();
      const avatar = relativeParentNodes.find('.inner img').eq(index).attr('src');
      return {
        url,
        name,
        avatar
      }
    });

  // 获取列表数据
  const list =$('#TopicsNode .cell').toArray().map((child)=> {
    const currentNode = $(child);
    const title = currentNode.find('.item_title a');
    const user = currentNode.find('.topic_info strong a');
    const replayer = currentNode.find('.topic_info strong a').eq(1);
    const replayTime = currentNode.find('.topic_info').text().replace(/(.*)•\s+(.*)\s+•\s+/, '$2').replace('最后回复来自', '').replace(replayer ? replayer.text(): '', '').replace(user.text(), '').trim();
    return {
      title: title.text(),
      url: title.attr('href'),
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
      replay_count: Number(currentNode.find('.count_livid') ? currentNode.find('.count_livid').text() : 0)
    }
   })
  return {
    slogans,
    avatar,
    relative: relativeNodes,
    page_count: pageCount,
    list
  };
  } catch (error) {
    console.log(error.message);
    return '';
  }
}
