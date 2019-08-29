import cheerio from 'cheerio';
export async function parseDetail(html: string) {
  const $ = cheerio.load(html);
  // 获取基本数据
  const title = $('h1').text();
  const desc = $('.markdown_body').html() || $('.topic_content').html();
  const page_count = Number($('#Main .box .page_input').val() || 0);
  const tags = $('#Main .tag')
    .map((index, ele) => {
      return {
        name: $(ele).text(),
        href: ele.attribs['href'],
      };
    })
    .toArray();
  const moreInfoNode = $('#Main .box .header .gray');

  const userLink = $(moreInfoNode)
    .find('a')
    .eq(0);
  const content = moreInfoNode.text();
  const readCount = content
    .replace(userLink.text(), '')
    .replace(/(.*?)(\d+)(\s次点击)/, '$2')
    .trim();
  const user = {
    name: userLink.text(),
    url: userLink.attr('href'),
  };
  const time = content
    .replace(new RegExp(`${readCount}\\s次点击`), '')
    .replace(userLink.text(), '')
    .replace(/·/g, '')
    .trim();

  // 获取列表数据
  const list = $('#Main .box .cell')
    .toArray()
    .filter(item => !!item.attribs['id'])
    .map(child => {
      return {
        user: {
          name: $(child)
            .find('td strong a.dark')
            .text(),
          url: $(child)
            .find('td strong a.dark')
            .attr('href'),
          avatar: $(child)
            .find('img')
            .attr('src'),
        },
        content: $(child)
          .find('.reply_content')
          .text(),
        floor_num: Number(
          $(child)
            .find('.no')
            .text() || 0,
        ),
        love_num: $(child).find('.small.fade')
          ? $(child)
              .find('.small.fade')
              .text()
              .replace(/(.*?)(\d+)/, '$2')
          : 0,
        time: $(child)
          .find('.ago')
          .text(),
      };
    });

  return {
    title,
    desc,
    tags,
    time,
    user,
    content,
    replay: {
      list: list,
      page_count,
    },
  };
}
