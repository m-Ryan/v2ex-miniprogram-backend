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
import { BASE_URL, MOCK_COOKIE } from '../constants';
import { UserError } from '../common/filters/userError';

@Controller('v2ex')
@UseInterceptors(CacheInterceptor)
export class V2exController {
  constructor(private readonly service: V2exService) { }

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
