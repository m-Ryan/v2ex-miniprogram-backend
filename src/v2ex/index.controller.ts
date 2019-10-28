import {
  Controller,
  Get,
  Query,
  CacheInterceptor,
  UseInterceptors,
  Post,
  Headers,
} from '@nestjs/common';
import { V2exService } from './index.service';
import { BASE_URL } from '../constants';
import { UserError } from '../common/filters/userError';

let MOCK_COOKIE = `__cfduid=d42f7d8d9896ee16dae8e60a522124ae31571754617; _ga=GA1.2.986388969.1571754618; A2="2|1:0|10:1571754997|2:A2|48:YzE4ZDRkMGYtNzFlYi00OTNhLTk5MWItNzlmYjQxNjgyNGNl|0e8c1d024db8b13acbc8dcb441a5c246ac546bf9fc179b895eb1aedb8e4cb68f"; V2EX_LANG=zhcn; V2EX_REFERRER="2|1:0|10:1572186312|13:V2EX_REFERRER|12:YXB0eDQ2ODk=|7a284743314ee58e52399928cda5df9f45f736e3c36218232d28de0249a61171"; V2EX_TAB="2|1:0|10:1572186381|8:V2EX_TAB|8:dGVjaA==|25f3bc36631da8fec3b2c7644f573baa613cd4b162fd6ff8a3be36133a37aecc"; PB3_SESSION="2|1:0|10:1572274792|11:PB3_SESSION|36:djJleDo2OC40LjIwMy4xMzE6OTMwODU2MzY=|86ad7fb40a3d29d63b807b0c8380a7cb8051219a94ba5d880ae4275645b34ea0"; _gid=GA1.2.1633480721.1572274793; _gat=1"; V2EX_LANG=zhcn; _gid=GA1.2.258513727.1570441028`;

@Controller('v2ex')
@UseInterceptors(CacheInterceptor)
export class V2exController {
  constructor(private readonly service: V2exService) { }

  @Get('set-mock-cookie')
  async setMockCookie(@Query('cookie') cookie: string) {
    if (!cookie) {
      return;
    }
    MOCK_COOKIE = cookie;
    return MOCK_COOKIE;
  }

  @Get('get-mock-cookie')
  async getMockCookie() {
    return MOCK_COOKIE;
  }

  @Get('tab')
  async getHome(@Query('tab') tab: string = 'tech', @Headers('v2ex-cookie') cookie: string = MOCK_COOKIE) {
    const pageUrl = `${BASE_URL}/?tab=${tab}`;
    const html = await this.service.getHomePage(pageUrl, cookie);
    return html;
  }

  @Get('list')
  async getList(@Query('page') page: number = 1, @Headers('v2ex-cookie') cookie: string = MOCK_COOKIE) {
    const pageUrl = `${BASE_URL}/recent?p=${page}`;
    const html = await this.service.getListPage(pageUrl, cookie);
    return html;
  }

  @Get('detail')
  async getDetail(@Query('id') id: number = 1, @Headers('v2ex-cookie') cookie: string = MOCK_COOKIE) {
    const pageUrl = `${BASE_URL}/t/${id}`;
    const html = await this.service.getDetailPage(pageUrl, cookie);
    return html;
  }

  @Get('detail-replay')
  async getDetailReplay(
    @Query('id') id: number = 1,
    @Query('page') page: number = 1,
    @Headers('v2ex-cookie') cookie: string = MOCK_COOKIE
  ) {
    const pageUrl = `${BASE_URL}/t/${id}?p=${page}`;
    const html = await this.service.getDetailReplay(pageUrl, cookie);
    return html;
  }

  // 节点列表
  @Get('node-list')
  async getNodeList(
    @Query('name') name: string,
    @Query('page') page: number = 1,
    @Headers('v2ex-cookie') cookie: string = MOCK_COOKIE
  ) {
    const pageUrl = `${BASE_URL}/go/${name}?p=${page}`;
    const html = await this.service.getNodeList(pageUrl, cookie);
    return html;
  }

  // 用户信息
  @Get('user-info')
  async getUserInfo(
    @Query('nickname') nickname: string,
    @Query('cookie') cookie: string,
    @Headers('v2ex-cookie') v2exCookie: string = MOCK_COOKIE) {
      let pageUrl = ''
      if (nickname) {
        pageUrl = `${BASE_URL}/member/${nickname}`;
        return this.service.getUserInfo(pageUrl, v2exCookie);
      }

      if (cookie) {
        const homeData = await this.service.getHomePage(BASE_URL, cookie);
        pageUrl = `${BASE_URL}/member/${homeData.user.nickname}`;
        return this.service.getUserInfo(pageUrl, cookie);
      }

      return new UserError('bad request');
  }

  // 收藏 必须登录才能使用
  @Get('collection')
  async getCollection(
    @Query('cookie') cookie: string = MOCK_COOKIE) {
      if (cookie) {
        const pageUrl = `${BASE_URL}/my/topics`;
        return this.service.getCollection(pageUrl, cookie);
      }
      return new UserError('bad request');
  }

  // 收藏 必须登录才能使用
  @Get('set-collection')
  async setCollection(
    @Query('url') url: string,
    @Query('referer_id') referer_id: string,
    @Headers('v2ex-cookie') cookie: string
    ) {
      const pageUrl = `${BASE_URL}${url}`;
      const referer = `https://www.v2ex.com/t/${referer_id}`
      return this.service.setCollection(pageUrl, cookie, referer);
  }

  // 忽略 必须登录才能使用
  @Get('set-ignore')
  async setIgnore(
    @Query('url') url: string,
    @Query('referer_id') referer_id: string,
    @Headers('v2ex-cookie') cookie: string
    ) {
      const pageUrl = `${BASE_URL}${url}`;
      const referer = `https://www.v2ex.com/t/${referer_id}`
      return this.service.setIgnore(pageUrl, cookie, referer);
  }

}
