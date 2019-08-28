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
const cheerio_1 = __importDefault(require("cheerio"));
function parseUserInfo(html) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const $ = cheerio_1.default.load(html);
            const avatar = $('#Main .box .cell .avatar').attr('src');
            const active_rank = $('#Main .box .cell table .gray a').text();
            const register_rank = parseInt($('#Main .box .cell table .gray')
                .text()
                .replace(/(.*)第/, ''));
            const register_time = $('#Main .box .cell table .gray')
                .text()
                .replace(/(.*)加入于/, '')
                .replace('今日活跃度排名', '')
                .replace(active_rank, '')
                .trim();
            const nickname = $('#Main h1').text();
            const bigger = $('#Main .bigger').text();
            const widgets = $('.widgets a')
                .toArray()
                .map(child => {
                return {
                    name: $(child)
                        .text()
                        .trim(),
                    url: $(child)
                        .find('img')
                        .attr('src')
                        .trim(),
                };
            });
            return {
                avatar,
                nickname,
                bigger,
                widgets,
                register_rank,
                register_time,
                active_rank,
            };
        }
        catch (error) {
            console.log(error.message);
            return '';
        }
    });
}
exports.parseUserInfo = parseUserInfo;
//# sourceMappingURL=userInfo.js.map