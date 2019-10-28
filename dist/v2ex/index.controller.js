"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
const index_service_1 = require("./index.service");
const constants_1 = require("../constants");
const userError_1 = require("../common/filters/userError");
let MOCK_COOKIE = `__cfduid=d42f7d8d9896ee16dae8e60a522124ae31571754617; _ga=GA1.2.986388969.1571754618; A2="2|1:0|10:1571754997|2:A2|48:YzE4ZDRkMGYtNzFlYi00OTNhLTk5MWItNzlmYjQxNjgyNGNl|0e8c1d024db8b13acbc8dcb441a5c246ac546bf9fc179b895eb1aedb8e4cb68f"; V2EX_LANG=zhcn; V2EX_REFERRER="2|1:0|10:1572186312|13:V2EX_REFERRER|12:YXB0eDQ2ODk=|7a284743314ee58e52399928cda5df9f45f736e3c36218232d28de0249a61171"; V2EX_TAB="2|1:0|10:1572186381|8:V2EX_TAB|8:dGVjaA==|25f3bc36631da8fec3b2c7644f573baa613cd4b162fd6ff8a3be36133a37aecc"; PB3_SESSION="2|1:0|10:1572274792|11:PB3_SESSION|36:djJleDo2OC40LjIwMy4xMzE6OTMwODU2MzY=|86ad7fb40a3d29d63b807b0c8380a7cb8051219a94ba5d880ae4275645b34ea0"; _gid=GA1.2.1633480721.1572274793; _gat=1"; V2EX_LANG=zhcn; _gid=GA1.2.258513727.1570441028`;
let V2exController = class V2exController {
    constructor(service) {
        this.service = service;
    }
    setMockCookie(cookie) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!cookie) {
                return;
            }
            MOCK_COOKIE = cookie;
            return MOCK_COOKIE;
        });
    }
    getMockCookie() {
        return __awaiter(this, void 0, void 0, function* () {
            return MOCK_COOKIE;
        });
    }
    getHome(tab = 'tech', cookie = MOCK_COOKIE) {
        return __awaiter(this, void 0, void 0, function* () {
            const pageUrl = `${constants_1.BASE_URL}/?tab=${tab}`;
            const html = yield this.service.getHomePage(pageUrl, cookie);
            return html;
        });
    }
    getList(page = 1, cookie = MOCK_COOKIE) {
        return __awaiter(this, void 0, void 0, function* () {
            const pageUrl = `${constants_1.BASE_URL}/recent?p=${page}`;
            const html = yield this.service.getListPage(pageUrl, cookie);
            return html;
        });
    }
    getDetail(id = 1, cookie = MOCK_COOKIE) {
        return __awaiter(this, void 0, void 0, function* () {
            const pageUrl = `${constants_1.BASE_URL}/t/${id}`;
            const html = yield this.service.getDetailPage(pageUrl, cookie);
            return html;
        });
    }
    getDetailReplay(id = 1, page = 1, cookie = MOCK_COOKIE) {
        return __awaiter(this, void 0, void 0, function* () {
            const pageUrl = `${constants_1.BASE_URL}/t/${id}?p=${page}`;
            const html = yield this.service.getDetailReplay(pageUrl, cookie);
            return html;
        });
    }
    getNodeList(name, page = 1, cookie = MOCK_COOKIE) {
        return __awaiter(this, void 0, void 0, function* () {
            const pageUrl = `${constants_1.BASE_URL}/go/${name}?p=${page}`;
            const html = yield this.service.getNodeList(pageUrl, cookie);
            return html;
        });
    }
    getUserInfo(nickname, cookie, v2exCookie = MOCK_COOKIE) {
        return __awaiter(this, void 0, void 0, function* () {
            let pageUrl = '';
            if (nickname) {
                pageUrl = `${constants_1.BASE_URL}/member/${nickname}`;
                return this.service.getUserInfo(pageUrl, v2exCookie);
            }
            if (cookie) {
                const homeData = yield this.service.getHomePage(constants_1.BASE_URL, cookie);
                pageUrl = `${constants_1.BASE_URL}/member/${homeData.user.nickname}`;
                return this.service.getUserInfo(pageUrl, cookie);
            }
            return new userError_1.UserError('bad request');
        });
    }
    getCollection(cookie = MOCK_COOKIE) {
        return __awaiter(this, void 0, void 0, function* () {
            if (cookie) {
                const pageUrl = `${constants_1.BASE_URL}/my/topics`;
                return this.service.getCollection(pageUrl, cookie);
            }
            return new userError_1.UserError('bad request');
        });
    }
    setCollection(url, referer_id, cookie) {
        return __awaiter(this, void 0, void 0, function* () {
            const pageUrl = `${constants_1.BASE_URL}${url}`;
            const referer = `https://www.v2ex.com/t/${referer_id}`;
            return this.service.setCollection(pageUrl, cookie, referer);
        });
    }
    setIgnore(url, referer_id, cookie) {
        return __awaiter(this, void 0, void 0, function* () {
            const pageUrl = `${constants_1.BASE_URL}${url}`;
            const referer = `https://www.v2ex.com/t/${referer_id}`;
            return this.service.setIgnore(pageUrl, cookie, referer);
        });
    }
};
__decorate([
    common_1.Get('set-mock-cookie'),
    __param(0, common_1.Query('cookie')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], V2exController.prototype, "setMockCookie", null);
__decorate([
    common_1.Get('get-mock-cookie'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], V2exController.prototype, "getMockCookie", null);
__decorate([
    common_1.Get('tab'),
    __param(0, common_1.Query('tab')), __param(1, common_1.Headers('v2ex-cookie')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], V2exController.prototype, "getHome", null);
__decorate([
    common_1.Get('list'),
    __param(0, common_1.Query('page')), __param(1, common_1.Headers('v2ex-cookie')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], V2exController.prototype, "getList", null);
__decorate([
    common_1.Get('detail'),
    __param(0, common_1.Query('id')), __param(1, common_1.Headers('v2ex-cookie')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], V2exController.prototype, "getDetail", null);
__decorate([
    common_1.Get('detail-replay'),
    __param(0, common_1.Query('id')),
    __param(1, common_1.Query('page')),
    __param(2, common_1.Headers('v2ex-cookie')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], V2exController.prototype, "getDetailReplay", null);
__decorate([
    common_1.Get('node-list'),
    __param(0, common_1.Query('name')),
    __param(1, common_1.Query('page')),
    __param(2, common_1.Headers('v2ex-cookie')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, String]),
    __metadata("design:returntype", Promise)
], V2exController.prototype, "getNodeList", null);
__decorate([
    common_1.Get('user-info'),
    __param(0, common_1.Query('nickname')),
    __param(1, common_1.Query('cookie')),
    __param(2, common_1.Headers('v2ex-cookie')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], V2exController.prototype, "getUserInfo", null);
__decorate([
    common_1.Get('collection'),
    __param(0, common_1.Query('cookie')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], V2exController.prototype, "getCollection", null);
__decorate([
    common_1.Get('set-collection'),
    __param(0, common_1.Query('url')),
    __param(1, common_1.Query('referer_id')),
    __param(2, common_1.Headers('v2ex-cookie')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], V2exController.prototype, "setCollection", null);
__decorate([
    common_1.Get('set-ignore'),
    __param(0, common_1.Query('url')),
    __param(1, common_1.Query('referer_id')),
    __param(2, common_1.Headers('v2ex-cookie')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], V2exController.prototype, "setIgnore", null);
V2exController = __decorate([
    common_1.Controller('v2ex'),
    common_1.UseInterceptors(common_1.CacheInterceptor),
    __metadata("design:paramtypes", [index_service_1.V2exService])
], V2exController);
exports.V2exController = V2exController;
//# sourceMappingURL=index.controller.js.map