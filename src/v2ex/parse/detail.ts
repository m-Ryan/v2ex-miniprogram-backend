
import cheerio from 'cheerio';
export async function parseDetail(html: string) {
  const $ = cheerio.load(html);
  

  // 获取基本数据
  const title = await $('h1').e;
  const desc = await $('.markdown_body', ele=>ele.textContent);
  const page_count =  await page.$$eval('#Main .box .page_normal', eles=> {
    return eles.length > 0 ? eles[eles.length - 1].textContent : 1;
  })

  // const tags = await page.$$eval('#Main .tag', eles=>eles.map(ele=>(
  //   {
  //     text: ele.textContent,
  //     href: ele.getAttribute('href'),
  //   }
  // )));

  // const moreInfo =  await page.$eval('#Main .box .header .gray', ele=>{
  //   const userLink = ele.querySelector('a');
  //   const content =  ele.textContent;
  //   const readCount = content.replace(userLink.textContent, '').replace(/(.*?)(\d+)(\s次点击)/, '$2').trim();
  //   return {
  //     user: {
  //       name: userLink.textContent,
  //       url: userLink.getAttribute('href'),
  //     },
  //     time: content.replace(new RegExp(`${readCount}\\s次点击`), '').replace(userLink.textContent, '').replace(/·/g, '').trim(),
  //     read_count:readCount,
  //     content
  //   }
  // });

  // // const listBody = $('#Main .box .cell');
  // // const user = listBody.find('td strong a.dark')
  // // console.log(user.eq(0).text(), user.attr('href'))
  // // 获取列表数据
  // const list = await page.$$eval('#Main .box .cell', eles=> {
  //   return eles.filter(item=>item.getAttribute('id')).map((child)=> {
  //    return {
  //      user: {
  //       name: child.querySelector('td strong a.dark').textContent,
  //       url: child.querySelector('td strong a.dark').getAttribute('href'),
  //       avatar: child.querySelector('img').getAttribute('src'),
  //      },
  //      content: child.querySelector('.reply_content').textContent,
  //      floor_num: child.querySelector('.no').textContent,
  //      love_num: child.querySelector('.small.fade') ? child.querySelector('.small.fade').textContent.replace(/(.*?)(\d+)/, '$2') : 0,
  //      time: child.querySelector('.ago').textContent
  //    }
  //   })
  // })

  // await browser.close();

  // return {
  //   title,
  //   desc,
  //   tags,
  //   ...moreInfo,
  //   replay: {
  //     list: list,
  //     page_count
  //   }
  // };
}