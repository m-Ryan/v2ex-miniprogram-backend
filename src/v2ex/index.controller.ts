import {
  Controller,
  Get,
  Query,
  UseInterceptors,
  CacheInterceptor,
} from '@nestjs/common';
import { V2exService } from './index.service';
import { BASE_URL } from '@/constants';

@Controller('v2ex')
@UseInterceptors(CacheInterceptor)
export class V2exController {
  constructor(private readonly service: V2exService) {}

  @Get('tab')
  async getHome(@Query('tab') tab: string = 'tech') {
    const pageUrl = `${BASE_URL}/?tab=${tab}`;
    const html = await this.service.getHomePage(pageUrl);
    return html;
  }

  @Get('list')
  async getList(@Query('page') page: number = 1) {
    const pageUrl = `${BASE_URL}/recent?p=${page}`;
    const html = await this.service.getListPage(pageUrl);
    return html;
  }

  @Get('detail')
  async getDetail(@Query('id') id: number = 1) {
    const pageUrl = `${BASE_URL}/t/${id}`;
    const html = await this.service.getDetailPage(pageUrl);
    return html;
  }

  @Get('detail-replay')
  async getDetailReplay(
    @Query('id') id: number = 1,
    @Query('page') page: number = 1,
  ) {
    const pageUrl = `${BASE_URL}/t/${id}?p=${page}`;
    const html = await this.service.getDetailReplay(pageUrl);
    return html;
  }

  // 节点列表
  @Get('node-list')
  async getNodeList(
    @Query('name') name: string,
    @Query('page') page: number = 1,
  ) {
    const pageUrl = `${BASE_URL}/go/${name}?p=${page}`;
    const html = await this.service.getNodeList(pageUrl);
    return html;
  }
  // 节点列表
  @Get('user-info')
  async getUserInfo(@Query('nickname') nickname: string) {
    const pageUrl = `${BASE_URL}/member/${nickname}`;
    const html = await this.service.getUserInfo(pageUrl);
    return html;
  }
}
