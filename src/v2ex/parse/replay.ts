import cheerio from 'cheerio';

export async function parseReplay(html: string) {
  try {
    const $ = cheerio.load(html);

      // 获取列表数据
  const list = $('#Main .box .cell').toArray().filter((item)=>!!item.attribs['id']).map((child)=> {
    return {
      user: {
       name:$(child).find('td strong a.dark').text(),
       url:$(child).find('td strong a.dark').attr('href'),
       avatar:$(child).find('img').attr['src'],
      },
      content:$(child).find('.reply_content').text(),
      floor_num:$(child).find('.no').text(),
      love_num:$(child).find('.small.fade') ?$(child).find('.small.fade').text().replace(/(.*?)(\d+)/, '$2') : 0,
      time:$(child).find('.ago').text()
    }
   })

    return list;
  } catch (error) {
    console.log(error.message);
    return '';
  }
}
