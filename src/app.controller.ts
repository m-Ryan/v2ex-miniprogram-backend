import { Controller, Get, Post, Res, Query, Req } from '@nestjs/common';
import { AppService } from './app.service';
import axios from 'axios';
import * as puppeteer from 'puppeteer';
import * as cookie from 'cookie';
import * as qs from 'qs';
import { Response, Request } from 'express';
import { MOCK_COOKIE, BASE_DOMAIN } from './constants';
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
  async getDate() {
   return new Date().toLocaleDateString()
  }

}
