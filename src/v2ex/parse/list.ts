import puppeteer from 'puppeteer';
export async function parseList(html: string) {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setContent(html);
  
  // 获取tab数据
  const pageCount = await page.$$eval('#Main .box .page_normal', eles=> {
    return eles[eles.length - 1].textContent
  })
  
  // 获取列表数据
  const listData = await page.$$eval('#Main .box .item tbody', eles=> {
    return eles.map((child)=> {
     const title = child.querySelector('.item_title a');
     const relative = child.querySelector('.topic_info .node');
     const user = child.querySelector('.topic_info strong a');
     const replayer = child.querySelectorAll('.topic_info strong a')[1];
     const replayTime = child.querySelector('.topic_info').textContent.replace(/(.*)•\s+(.*)\s+•\s+/, '$2').replace('最后回复来自', '').replace(replayer ? replayer.textContent: '', '').replace(user.textContent, '').trim();
     return {
       title: title.textContent,
       url: title.getAttribute('href'),
       relative: {
        text: relative.textContent,
        href: relative.getAttribute('href'),
       },
       user: {
        avatar: child.querySelector('img').getAttribute('src'),
        name: user.textContent,
        name_url: user.getAttribute('href'),
      },
       last_replay: {
        time: replayTime,
        user_name: replayer && replayer.textContent,
        user_name_url: replayer && replayer.getAttribute('href'),
       },
       replay_count: child.querySelector('.count_livid') ? child.querySelector('.count_livid').textContent : 0
     }
    })
  })


  await browser.close();
  const resData = {
    page_count: pageCount,
    list: listData
  }
  return resData;
}