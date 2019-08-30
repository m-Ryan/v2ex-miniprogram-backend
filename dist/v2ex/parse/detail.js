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
        const $ = cheerio_1.default.load(html, {
            decodeEntities: false
        });
        const title = $('h1').text();
        const desc = $('.markdown_body').html() || $('.topic_content').html() || '';
        const page_count = Number($('#Main .box .page_input').val() || 0);
        const tags = $('#Main .tag')
            .toArray()
            .map((ele) => {
            return {
                name: $(ele).text(),
                href: ele.attribs['href'],
            };
        });
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
            avatar: $('.header .avatar').attr('src')
        };
        const time = content
            .replace(new RegExp(`${readCount}\\s次点击`), '')
            .replace(userLink.text(), '')
            .replace(/·/g, '')
            .trim();
        const collection = $('.topic_buttons a');
        const is_collected = collection.text().indexOf('取消收藏') !== -1;
        const ignoreNode = collection.toArray().filter(item => $(item).text().indexOf('忽略') !== -1);
        const is_ignore = $(ignoreNode).text().indexOf('取消忽略') !== -1;
        const ignore_url = is_ignore
            ? $(ignoreNode).attr('onclick').replace(/(.*)\'\/unignore\/topic\/(\d+)\?once\=(\d+)\'(.*)/, '/unignore/topic/$2?once=$3')
            : $(ignoreNode).attr('onclick').replace(/(.*)\'\/ignore\/topic\/(\d+)\?once\=(\d+)\'(.*)/, '/ignore/topic/$2?once=$3');
        const collection_url = collection.attr('href');
        const click_count = $('.topic_stats').text().match(/(\d+)\s+次点击/) ? parseInt($('.topic_stats').text().match(/(\d+)\s+次点击/)[1]) : 0;
        const collection_count = $('.topic_stats').text().match(/(\d+)\s+人收藏/) ? parseInt($('.topic_stats').text().match(/(\d+)\s+人收藏/)[1]) : 0;
        const thank_count = $('.topic_stats').text().match(/(\d+)\s+人感谢/) ? parseInt($('.topic_stats').text().match(/(\d+)\s+人感谢/)[1]) : 0;
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
            more_info: {
                is_collected,
                collection_url,
                is_ignore,
                ignore_url,
                click_count,
                collection_count,
                thank_count
            },
            replay: {
                list: list,
                page_count,
            },
        };
    });
}
exports.parseDetail = parseDetail;
//# sourceMappingURL=detail.js.map