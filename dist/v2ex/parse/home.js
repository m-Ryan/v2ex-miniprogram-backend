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
function parseHome(html) {
    return __awaiter(this, void 0, void 0, function* () {
        const $ = cheerio_1.default.load(html, {
            decodeEntities: false
        });
        const avatar = $('#Rightbar .avatar').attr('src');
        const nickname = $('.bigger a').text();
        const tabs = $('#Tabs a')
            .toArray()
            .map(child => {
            return {
                name: $(child).text(),
                url: $(child).attr('href'),
            };
        });
        const secondary_tabs = $('#SecondaryTabs a')
            .toArray()
            .map(child => {
            return {
                name: $(child).text(),
                url: $(child).attr('href'),
            };
        });
        const topicsHot = $('#TopicsHot table')
            .toArray()
            .map(child => {
            return {
                avatar: $(child)
                    .find('img')
                    .attr('src'),
                url: $(child)
                    .find('.item_hot_topic_title a')
                    .attr('href'),
                name: $(child)
                    .find('.item_hot_topic_title a')
                    .text(),
            };
        });
        const hotNodes = $('#Rightbar .cell .item_node')
            .toArray()
            .map(child => {
            return {
                url: $(child).attr('href'),
                name: $(child).text(),
            };
        });
        const newNodes = $('#Rightbar .inner .item_node')
            .toArray()
            .map(child => {
            return {
                url: $(child).attr('href'),
                name: $(child).text(),
            };
        });
        const listData = $('#Main .box .item tbody')
            .toArray()
            .map(child => {
            const title = $(child).find('.item_title a');
            const tag = $(child).find('.topic_info .node');
            const user = $(child).find('.topic_info strong a');
            const replayer = $(child)
                .find('.topic_info strong a')
                .eq(1);
            const replayTime = $(child)
                .find('.topic_info')
                .text()
                .replace(/(.*)•\s+(.*)\s+•\s+/, '$2')
                .replace('最后回复来自', '')
                .replace(replayer ? replayer.text() : '', '')
                .replace(user.text(), '')
                .trim();
            return {
                title: title.text(),
                url: title.attr('href'),
                user: {
                    avatar: $(child)
                        .find('img')
                        .attr('src'),
                    name: user.text(),
                    url: user.attr('href'),
                },
                tag: {
                    name: tag.text(),
                    url: tag.attr('href'),
                },
                last_replay: {
                    time: replayTime,
                    user_name: replayer && replayer.text(),
                    user_url: replayer && replayer.attr('href'),
                },
                replay_count: $(child).find('.count_livid')
                    ? $(child)
                        .find('.count_livid')
                        .text()
                    : 0,
            };
        });
        const resData = {
            user: {
                avatar,
                nickname,
            },
            hot_nodes: hotNodes,
            new_nodes: newNodes,
            topic: topicsHot,
            list: listData,
            tabs,
            secondary_tabs,
        };
        return resData;
    });
}
exports.parseHome = parseHome;
//# sourceMappingURL=home.js.map