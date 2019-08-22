import puppeteer from 'puppeteer';
export async function parseHome(html: string) {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setContent(html);

  // 今日热议主题
  const topicsHot = await page.$$eval('#TopicsHot table', eles => {
    return eles.map((child) => {
      return {
        avatar: child.querySelector('img').getAttribute('src'),
        url: child.querySelector('.item_hot_topic_title a').getAttribute('href'),
        name: child.querySelector('.item_hot_topic_title a').textContent,
      }
    })
  })

  // 最热节点
  const hotNodes = await page.$$eval('#Rightbar .cell .item_node', eles => {
    return eles.map((child) => {
      return {
        url: child.getAttribute('href'),
        name: child.textContent,
      }
    })
  })

  // 最近新增节点
  const newNodes = await page.$$eval('#Rightbar .inner .item_node', eles => {
    return eles.map((child) => {
      return {
        url: child.getAttribute('href'),
        name: child.textContent,
      }
    })
  })


  // 获取列表数据
  const listData = await page.$$eval('#Main .box .item tbody', eles => {
    return eles.map((child) => {
      const title = child.querySelector('.item_title a');
      const tag = child.querySelector('.topic_info .node');
      const user = child.querySelector('.topic_info strong a');
      const replayer = child.querySelectorAll('.topic_info strong a')[1];
      const replayTime = child.querySelector('.topic_info').textContent.replace(/(.*)•\s+(.*)\s+•\s+/, '$2')
      .replace('最后回复来自', '').replace(replayer ? replayer.textContent : '', '').replace(user.textContent, '').trim();
      return {
        title: title.textContent,
        url: title.getAttribute('href'),
        user: {
          avatar: child.querySelector('img').getAttribute('src'),
          name: user.textContent,
          name_url: user.getAttribute('href'),
        },
        tag: {
          text: tag.textContent,
          url: tag.getAttribute('href'),
        },
        last_replay: {
          time: replayTime,
          user_name: replayer && replayer.textContent,
          user_url: replayer && replayer.getAttribute('href'),
        },
        replay_count: child.querySelector('.count_livid') ? child.querySelector('.count_livid').textContent : 0
      }
    })
  })

  await browser.close();
  const resData = {
    hot_nodes: hotNodes,
    new_nodes: newNodes,
    topic: topicsHot,
    list: listData
  }
  return resData;
}
