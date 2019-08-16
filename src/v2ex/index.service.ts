import { Injectable } from '@nestjs/common';
import { getPuppeteerPage } from '@/utils/puppeteer-page';
import { parseHome } from './parse/home';
import { parseList } from './parse/list';
import { parseDetail } from './parse/detail';

@Injectable()
export class V2exService {
  
  async getHomePage(url: string) {
    const html = await getPuppeteerPage(url)
    return parseHome(html)
  }
  
  async getListPage(url: string) {
    const html = await getPuppeteerPage(url)
    return parseList(html)
  }
  
  async getDetailPage(url: string) {
    console.log('1111')
    const html = await getPuppeteerPage(url)
    return parseDetail(html)
  }


}
