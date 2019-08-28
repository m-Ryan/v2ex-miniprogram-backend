"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const axios_1 = __importDefault(require("axios"));
function getPuppeteerPage(pageUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const beginTime = new Date().getTime();
            console.log('爬取开始');
            let data = yield axios_1.default.get(pageUrl, {
                headers: {
                    scheme: 'https',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Cookie: constants_1.MOCK_COOKIE,
                    Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
                    'Accept-Encoding': 'gzip, deflate, br',
                    'Accept-Language': 'zh-CN,zh;q=0.9,und;q=0.8',
                    'Cache-Control': 'max-age=0',
                    Connection: 'keep-alive',
                    DNT: '1',
                    'Upgrade-Insecure-Requests': '1',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36',
                },
            });
            const endTime = new Date().getTime();
            console.log('爬取结束');
            console.log(`耗时${endTime - beginTime}ms`);
            return data.data;
        }
        catch (err) {
            console.error(err);
        }
    });
}
exports.getPuppeteerPage = getPuppeteerPage;
//# sourceMappingURL=puppeteer-page.js.map