import { Controller, Get, Post, Res, Query, Req } from '@nestjs/common';
import { AppService } from './app.service';
import axios from 'axios';
import * as puppeteer from 'puppeteer';
import cookie from 'cookie';
import fs from 'fs';
import { uploadQiuNiuFile } from './utils/upload';
import * as qs from 'qs';
import { Response, Request } from 'express';
const cachePageMap: { [key: string]: string } = {};

const postData = {
  name_key: '',
  password_key: '',
  code_key: '',
  once: '',
  next: '/',
  name_value: 'ryan19961996',
  password_value: '41841800',
  code_value: ''
}


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  async getSSR(@Res() res: Response) {
    const pageUrl = 'https://www.v2ex.com/signin';
    // if(cachePageMap[pageUrl]) {
    //     ctx.body = cachePageMap[pageUrl];
    //     return;
    // }
    const { html, cookies } = await getPageContent(pageUrl);
    cachePageMap[pageUrl] = html;
    cookies.map(item => {
      res.cookie(item.name, item.value)
    })
    res.send(html)
  }

  @Get('/signin')
  async login(
    @Res() res: Response,
    @Req() req: Request,
    @Query('code_value') code_value: string,
  ) {
    postData.code_value = code_value;
    const data = qs.stringify({
      [postData.code_key]: postData.code_value,
      [postData.name_key]: postData.name_value,
      [postData.password_key]: postData.password_value,
      once: postData.once,
      next: postData.next
    });

    try {
      const result = await axios.post('https://www.v2ex.com/signin', data, {
        headers: {
          'authority': 'www.v2ex.com',
          'method': 'POST',
          'X-Forwarded-For': '61.222.32.2',
          'path': '/signin',
          'scheme': 'https',
          'Content-Type': 'application/x-www-form-urlencoded',
          'Cookie': req.headers.cookie,
          'Host': 'www.v2ex.com',
          'Origin': 'https://www.v2ex.com',
          'Referer':'https://www.v2ex.com/signin',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
          'Accept-Encoding': 'gzip, deflate, br',
          'Accept-Language': 'zh-CN,zh;q=0.9,und;q=0.8',
          'Cache-Control': 'max-age=0',
          'Connection': 'keep-alive',
          'DNT': '1',
          'Upgrade-Insecure-Requests': '1',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36'
        },
      })
      res.set('set-cookie', result.headers['set-cookie'])
      res.send(result.data)
    } catch (error) {
      console.log(error)
    }

  }
}

async function getPageContent2(pageUrl: string, cookies) {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  try {
    await page.goto(pageUrl, { waitUntil: "networkidle0" })
    const v2Cookies = await page.cookies();
    const cookies = v2Cookies.map((item => (`${item.name}=${item.value}`))).join('; ')
    const postFormNodes = await (await page.$('#Main form')).$$eval('input', e => e.map(item=> ({
      name: item.getAttribute('name'),
      value: item.getAttribute('value')
    })))
    postData.name_key = postFormNodes[0].name;
    postData.password_key = postFormNodes[1].name;
    postData.code_key = postFormNodes[2].name;
    postData.once = postFormNodes[3].value;
    let postForm = await page.$eval('#Main form', e => e.outerHTML);
    const code = /(.*)url\(\'(\/_captcha\?once=\d+)\'\)(.*)/.exec(postForm)[2];
    const codeImgBuffer = await axios.get(`https://www.v2ex.com${code}`, {
      headers: {
        cookie: cookies
      },
      responseType: 'arraybuffer'
    })
    const codeImgUrl = await uploadQiuNiuFile(codeImgBuffer)
    postForm = postForm.replace(/url\(\'(\/_captcha\?once=\d+)\'\)/, `url('${codeImgUrl}')`)
    await page.setContent(postForm)
    const html = await page.content();
    await browser.close();
    return ({
      html,
      cookies: v2Cookies
    });
  } catch (err) {
    console.error(err);
    await browser.close();
    throw new Error("page.goto/waitForSelector timed out.");
  }

}
async function getPageContent(pageUrl: string) {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  try {
    await page.goto(pageUrl, { waitUntil: "networkidle0" })
    const v2Cookies = await page.cookies();
    const cookies = v2Cookies.map((item => (`${item.name}=${item.value}`))).join('; ')
    const postFormNodes = await (await page.$('#Main form')).$$eval('input', e => e.map(item=> ({
      name: item.getAttribute('name'),
      value: item.getAttribute('value')
    })))
    postData.name_key = postFormNodes[0].name;
    postData.password_key = postFormNodes[1].name;
    postData.code_key = postFormNodes[2].name;
    postData.once = postFormNodes[3].value;
    let postForm = await page.$eval('#Main form', e => e.outerHTML);
    const code = /(.*)url\(\'(\/_captcha\?once=\d+)\'\)(.*)/.exec(postForm)[2];
    const codeImgBuffer = await axios.get(`https://www.v2ex.com${code}`, {
      headers: {
        cookie: cookies
      },
      responseType: 'arraybuffer'
    })
    const codeImgUrl = await uploadQiuNiuFile(codeImgBuffer)
    postForm = postForm.replace(/url\(\'(\/_captcha\?once=\d+)\'\)/, `url('${codeImgUrl}')`)
    await page.setContent(postForm)
    const html = await page.content();
    await browser.close();
    return ({
      html,
      cookies: v2Cookies
    });
  } catch (err) {
    console.error(err);
    await browser.close();
    throw new Error("page.goto/waitForSelector timed out.");
  }

}
