"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const puppeteer_page_1 = require("@/utils/puppeteer-page");
const home_1 = require("./parse/home");
const list_1 = require("./parse/list");
const detail_1 = require("./parse/detail");
const replay_1 = require("./parse/replay");
const node_1 = require("./parse/node");
const userInfo_1 = require("./parse/userInfo");
let V2exService = class V2exService {
    getHomePage(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const html = yield puppeteer_page_1.getPuppeteerPage(url);
            return home_1.parseHome(html);
        });
    }
    getListPage(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const html = yield puppeteer_page_1.getPuppeteerPage(url);
            return list_1.parseList(html);
        });
    }
    getDetailPage(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const html = yield puppeteer_page_1.getPuppeteerPage(url);
            return detail_1.parseDetail(html);
        });
    }
    getDetailReplay(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const html = yield puppeteer_page_1.getPuppeteerPage(url);
            return replay_1.parseReplay(html);
        });
    }
    getNodeList(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const html = yield puppeteer_page_1.getPuppeteerPage(url);
            return node_1.parseNode(html);
        });
    }
    getUserInfo(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const html = yield puppeteer_page_1.getPuppeteerPage(url);
            return userInfo_1.parseUserInfo(html);
        });
    }
};
V2exService = __decorate([
    common_1.Injectable()
], V2exService);
exports.V2exService = V2exService;
//# sourceMappingURL=index.service.js.map