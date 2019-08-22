import puppeteer from 'puppeteer';

export async function parseReplay(html: string) {
  try {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.setContent(html);

    // 获取列表数据
    const list = await page.$$eval('#Main .box .cell', eles => {
      return eles.filter(item => item.getAttribute('id')).map((child) => {
        return {
          user: {
            name: child.querySelector('td strong a.dark').textContent,
            url: child.querySelector('td strong a.dark').getAttribute('href'),
            avatar: child.querySelector('img').getAttribute('src'),
          },
          content: child.querySelector('.reply_content').textContent,
          floor_num: child.querySelector('.no').textContent,
          love_num: child.querySelector('.small.fade') ? child.querySelector('.small.fade').textContent.replace(/(.*?)(\d+)/, '$2') : 0,
          time: child.querySelector('.ago').textContent
        }
      })
    })

    await browser.close();

    return list;
  } catch (error) {
    console.log(error.message);
    return '';
  }
}