import { Injectable } from '@nestjs/common';
import { getPuppeteerPage } from '../utils/puppeteer-page';
import { parseHome } from './parse/home';
import { parseList } from './parse/list';
import { parseDetail } from './parse/detail';
import { parseReplay } from './parse/replay';
import { parseNode } from './parse/node';
import { parseUserInfo } from './parse/userInfo';
import { parseUserCollection } from './parse/user-collection';

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

  async getCollection(url: string, cookie: string) {
    const html = await getPuppeteerPage(url, cookie);
    return parseUserCollection(html);
  }

  async setCollection(url: string, cookie: string, referer: string) {
    await getPuppeteerPage(url, cookie, {
      referer
    });
    return {
      message: 'ok',
      code: 200
    };
  }

  async setIgnore(url: string, cookie: string, referer: string) {
    await getPuppeteerPage(url, cookie, {
      referer
    });
    return {
      message: 'ok',
      code: 200
    };
  }

}
