import { Injectable } from '@nestjs/common';
import { getPuppeteerPage } from '../utils/puppeteer-page';
import { parseHome } from './parse/home';
import { parseList } from './parse/list';
import { parseDetail } from './parse/detail';
import { parseReplay } from './parse/replay';
import { parseNode } from './parse/node';
import { parseUserInfo } from './parse/userInfo';

@Injectable()
export class V2exService {
  async getHomePage(url: string, cookie: string) {
    const html = await getPuppeteerPage(url, cookie);
    return parseHome(html);
  }

  async getListPage(url: string, cookie: string) {
    const html = await getPuppeteerPage(url, cookie);
    return parseList(html);
  }

  async getDetailPage(url: string, cookie: string) {
    const html = await getPuppeteerPage(url, cookie);
    return parseDetail(html);
  }

  async getDetailReplay(url: string, cookie: string) {
    const html = await getPuppeteerPage(url, cookie);
    return parseReplay(html);
  }

  async getNodeList(url: string, cookie: string) {
    const html = await getPuppeteerPage(url, cookie);
    return parseNode(html);
  }

  async getUserInfo(url: string, cookie: string) {
    const html = await getPuppeteerPage(url, cookie);
    return parseUserInfo(html);
  }
}
