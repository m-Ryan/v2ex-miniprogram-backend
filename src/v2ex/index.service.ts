import { Injectable } from '@nestjs/common';
import { getPuppeteerPage } from '@/utils/puppeteer-page';
import { parseHome } from './parse/home';
import { parseList } from './parse/list';
import { parseDetail } from './parse/detail';
import { parseReplay } from './parse/replay';
import { parseNode } from './parse/node';
import { parseUserInfo } from './parse/userInfo';

@Injectable()
export class V2exService {
  async getHomePage(url: string) {
    const html = await getPuppeteerPage(url);
    return parseHome(html);
  }

  async getListPage(url: string) {
    const html = await getPuppeteerPage(url);
    return parseList(html);
  }

  async getDetailPage(url: string) {
    const html = await getPuppeteerPage(url);
    return parseDetail(html);
  }

  async getDetailReplay(url: string) {
    const html = await getPuppeteerPage(url);
    return parseReplay(html);
  }

  async getNodeList(url: string) {
    const html = await getPuppeteerPage(url);
    return parseNode(html);
  }

  async getUserInfo(url: string) {
    const html = await getPuppeteerPage(url);
    return parseUserInfo(html);
  }
}
