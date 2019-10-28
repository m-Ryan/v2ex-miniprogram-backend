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
function parseNode(html) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const $ = cheerio_1.default.load(html, {
                decodeEntities: false
            });
            const pageCount = Number($('#Main .box .page_normal')
                .last()
                .text() || 1);
            const slogans = $('.node_info .f12')
                .eq(1)
                .text();
            const avatar = $('.node_avatar img').attr('src');
            const relativeParentNodes = $('#Rightbar .box').eq(2);
            const relativeNodes = relativeParentNodes
                .find('.inner a')
                .toArray()
                .map((child, index) => {
                const url = $(child).attr('href');
                const name = $(child).text();
                const avatar = relativeParentNodes
                    .find('.inner img')
                    .eq(index)
                    .attr('src');
                return {
                    url,
                    name,
                    avatar,
                };
            });
            const list = $('#TopicsNode .cell')
                .toArray()
                .map(child => {
                const currentNode = $(child);
                const title = currentNode.find('.item_title a');
                const user = currentNode.find('.topic_info strong a');
                const replayer = currentNode.find('.topic_info strong a').eq(1);
                const replayTime = currentNode
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
                        avatar: currentNode.find('img').attr('src'),
                        name: user.text(),
                        url: user.attr('href'),
                    },
                    last_replay: {
                        time: replayTime,
                        user_name: replayer && replayer.text(),
                        user_url: replayer && replayer.attr('href'),
                    },
                    replay_count: Number(currentNode.find('.count_livid')
                        ? currentNode.find('.count_livid').text()
                        : 0),
                };
            });
            return {
                slogans,
                avatar,
                relative: relativeNodes,
                page_count: pageCount,
                list,
            };
        }
        catch (error) {
            console.log(error.message);
            return '';
        }
    });
}
exports.parseNode = parseNode;
//# sourceMappingURL=node.js.map