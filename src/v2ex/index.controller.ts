import {
  Controller,
  Get,
  Query,
  CacheInterceptor,
  UseInterceptors,
  Post,
} from '@nestjs/common';
import { V2exService } from './index.service';
import { BASE_URL, MOCK_COOKIE } from '../constants';

@Controller('v2ex')
@UseInterceptors(CacheInterceptor)
export class V2exController {
  constructor(private readonly service: V2exService) {}

  @Get('tab')
  async getHome(@Query('tab') tab: string = 'tech', @Query('cookie') cookie: string = MOCK_COOKIE) {
    const pageUrl = `${BASE_URL}/?tab=${tab}`;
    const html = await this.service.getHomePage(pageUrl, cookie);
    return html;
  }

  @Get('list')
  async getList(@Query('page') page: number = 1, @Query('cookie') cookie: string = MOCK_COOKIE) {
    const pageUrl = `${BASE_URL}/recent?p=${page}`;
    const html = await this.service.getListPage(pageUrl, cookie);
    return html;
  }

  @Get('detail')
  async getDetail(@Query('id') id: number = 1, @Query('cookie') cookie: string = MOCK_COOKIE) {
    const pageUrl = `${BASE_URL}/t/${id}`;
    const html = await this.service.getDetailPage(pageUrl, cookie);
    return html;
  }

  @Get('detail-replay')
  async getDetailReplay(
    @Query('id') id: number = 1,
    @Query('page') page: number = 1,
    @Query('cookie') cookie: string = MOCK_COOKIE
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
    @Query('cookie') cookie: string = MOCK_COOKIE
  ) {
    const pageUrl = `${BASE_URL}/go/${name}?p=${page}`;
    const html = await this.service.getNodeList(pageUrl, cookie);
    return html;
  }
  // 节点列表
  @Get('user-info')
  async getUserInfo(@Query('nickname') nickname: string, @Query('cookie') cookie: string = MOCK_COOKIE) {
    const pageUrl = `${BASE_URL}/member/${nickname}`;
    const html = await this.service.getUserInfo(pageUrl, cookie);
    return html;
  }
}
