import cheerio from 'cheerio';
export async function parseHome(html: string) {
  const $ = cheerio.load(html, {
    decodeEntities: false
  });

  const avatar = $('#Rightbar .avatar').attr('src');
  const nickname = $('.bigger a').text();

  // tab
  const tabs = $('#Tabs a')
    .toArray()
    .map(child => {
      return {
        name: $(child).text(),
        url: $(child).attr('href'),
      };
    });
  const secondary_tabs = $('#SecondaryTabs a')
    .toArray()
    .map(child => {
      return {
        name: $(child).text(),
        url: $(child).attr('href'),
      };
    });
  // 今日热议主题
  const topicsHot = $('#TopicsHot table')
    .toArray()
    .map(child => {
      return {
        avatar: $(child)
          .find('img')
          .attr('src'),
        url: $(child)
          .find('.item_hot_topic_title a')
          .attr('href'),
        name: $(child)
          .find('.item_hot_topic_title a')
          .text(),
      };
    });

  // 最热节点
  const hotNodes = $('#Rightbar .cell .item_node')
    .toArray()
    .map(child => {
      return {
        url: $(child).attr('href'),
        name: $(child).text(),
      };
    });

  // 最近新增节点
  const newNodes = $('#Rightbar .inner .item_node')
    .toArray()
    .map(child => {
      return {
        url: $(child).attr('href'),
        name: $(child).text(),
      };
    });

  // 获取列表数据
  const listData = $('#Main .box .item tbody')
    .toArray()
    .map(child => {
      const title = $(child).find('.item_title a');
      const tag = $(child).find('.topic_info .node');
      const user = $(child).find('.topic_info strong a');
      const replayer = $(child)
        .find('.topic_info strong a')
        .eq(1);
      const replayTime = $(child)
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
        user: {
          avatar: $(child)
            .find('img')
            .attr('src'),
          name: user.text(),
          url: user.attr('href'),
        },
        tag: {
          name: tag.text(),
          url: tag.attr('href'),
        },
        last_replay: {
          time: replayTime,
          user_name: replayer && replayer.text(),
          user_url: replayer && replayer.attr('href'),
        },
        replay_count: $(child).find('.count_livid')
          ? $(child)
              .find('.count_livid')
              .text()
          : 0,
      };
    });
  const resData = {
    user: {
      avatar,
      nickname,
    },
    hot_nodes: hotNodes,
    new_nodes: newNodes,
    topic: topicsHot,
    list: listData,
    tabs,
    secondary_tabs,
  };
  return resData;
}
