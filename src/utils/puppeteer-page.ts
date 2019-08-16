
import puppeteer from 'puppeteer';
import { MOCK_COOKIE } from '@/constants';

export async function getPuppeteerPage(pageUrl: string) {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  try {
    page.setExtraHTTPHeaders({
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
    })
   
    await page.goto(pageUrl, { waitUntil: "networkidle0" })
    const html = await page.content();
    await browser.close();
    return html
  } catch (err) {
    console.error(err);
    await browser.close();
    throw new Error("page.goto/waitForSelector timed out.");
  }

}