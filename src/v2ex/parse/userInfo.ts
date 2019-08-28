import cheerio from 'cheerio';

export async function parseUserInfo(html: string) {
  try {
    const $ = cheerio.load(html);

  // 获取列表数据
  const avatar = $('#Main .box .cell .avatar').attr('src');
  const active_rank = $('#Main .box .cell table .gray a').text();
  const register_rank = parseInt($('#Main .box .cell table .gray').text().replace(/(.*)第/, ''))
  const register_time = $('#Main .box .cell table .gray').text().replace(/(.*)加入于/, '').replace('今日活跃度排名', '').replace(active_rank, '').trim()
  const nickname = $('#Main h1').text();
  const bigger = $('#Main .bigger').text();
   const widgets = $('.widgets a').toArray().map(child=>{
     return {
       name: $(child).text().trim(),
       url: $(child).find('img').attr('src').trim()
     }
   })
    return {
      avatar,
      nickname,
      bigger,
      widgets,
      register_rank,
      register_time,
      active_rank
    };
  } catch (error) {
    console.log(error.message);
    return '';
  }
}
