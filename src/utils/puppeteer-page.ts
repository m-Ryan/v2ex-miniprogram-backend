
import { MOCK_COOKIE } from '@/constants';
import Axios from 'axios';

export async function getPuppeteerPage(pageUrl: string) {
  try {
  const beginTime = new Date().getTime();
  console.log('爬取开始');
  let data = await Axios.get(pageUrl, {
    headers: {
      'scheme': 'https',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Cookie': MOCK_COOKIE,
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'zh-CN,zh;q=0.9,und;q=0.8',
      'Cache-Control': 'max-age=0',
      'Connection': 'keep-alive',
      'DNT': '1',
      'Upgrade-Insecure-Requests': '1',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36'
    }
  });
    const endTime = new Date().getTime();
    console.log('爬取结束');
    console.log(`耗时${endTime - beginTime}ms`);
 
    return data.data
  } catch (err) {
    console.error(err);

    throw new Error("page.goto/waitForSelector timed out.");
  }

}