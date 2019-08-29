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
function parseDetail(html) {
    return __awaiter(this, void 0, void 0, function* () {
        const $ = cheerio_1.default.load(html);
        const title = $('h1').text();
        const desc = $('.markdown_body').html() || $('.topic_content').html();
        const page_count = Number($('#Main .box .page_input').val() || 0);
        const tags = $('#Main .tag')
            .map((index, ele) => {
            return {
                name: $(ele).text(),
                href: ele.attribs['href'],
            };
        })
            .toArray();
        const moreInfoNode = $('#Main .box .header .gray');
        const userLink = $(moreInfoNode)
            .find('a')
            .eq(0);
        const content = moreInfoNode.text();
        const readCount = content
            .replace(userLink.text(), '')
            .replace(/(.*?)(\d+)(\s次点击)/, '$2')
            .trim();
        const user = {
            name: userLink.text(),
            url: userLink.attr('href'),
        };
        const time = content
            .replace(new RegExp(`${readCount}\\s次点击`), '')
            .replace(userLink.text(), '')
            .replace(/·/g, '')
            .trim();
        const list = $('#Main .box .cell')
            .toArray()
            .filter(item => !!item.attribs['id'])
            .map(child => {
            return {
                user: {
                    name: $(child)
                        .find('td strong a.dark')
                        .text(),
                    url: $(child)
                        .find('td strong a.dark')
                        .attr('href'),
                    avatar: $(child)
                        .find('img')
                        .attr('src'),
                },
                content: $(child)
                    .find('.reply_content')
                    .text(),
                floor_num: Number($(child)
                    .find('.no')
                    .text() || 0),
                love_num: $(child).find('.small.fade')
                    ? $(child)
                        .find('.small.fade')
                        .text()
                        .replace(/(.*?)(\d+)/, '$2')
                    : 0,
                time: $(child)
                    .find('.ago')
                    .text(),
            };
        });
        return {
            title,
            desc,
            tags,
            time,
            user,
            content,
            replay: {
                list: list,
                page_count,
            },
        };
    });
}
exports.parseDetail = parseDetail;
//# sourceMappingURL=detail.js.map