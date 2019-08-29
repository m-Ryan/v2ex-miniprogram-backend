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
let V2exController = class V2exController {
    constructor(service) {
        this.service = service;
    }
    getHome(tab = 'tech', cookie = constants_1.MOCK_COOKIE) {
        return __awaiter(this, void 0, void 0, function* () {
            const pageUrl = `${constants_1.BASE_URL}/?tab=${tab}`;
            const html = yield this.service.getHomePage(pageUrl, cookie);
            return html;
        });
    }
    getList(page = 1, cookie = constants_1.MOCK_COOKIE) {
        return __awaiter(this, void 0, void 0, function* () {
            const pageUrl = `${constants_1.BASE_URL}/recent?p=${page}`;
            const html = yield this.service.getListPage(pageUrl, cookie);
            return html;
        });
    }
    getDetail(id = 1, cookie = constants_1.MOCK_COOKIE) {
        return __awaiter(this, void 0, void 0, function* () {
            const pageUrl = `${constants_1.BASE_URL}/t/${id}`;
            const html = yield this.service.getDetailPage(pageUrl, cookie);
            return html;
        });
    }
    getDetailReplay(id = 1, page = 1, cookie = constants_1.MOCK_COOKIE) {
        return __awaiter(this, void 0, void 0, function* () {
            const pageUrl = `${constants_1.BASE_URL}/t/${id}?p=${page}`;
            const html = yield this.service.getDetailReplay(pageUrl, cookie);
            return html;
        });
    }
    getNodeList(name, page = 1, cookie = constants_1.MOCK_COOKIE) {
        return __awaiter(this, void 0, void 0, function* () {
            const pageUrl = `${constants_1.BASE_URL}/go/${name}?p=${page}`;
            const html = yield this.service.getNodeList(pageUrl, cookie);
            return html;
        });
    }
    getUserInfo(nickname, cookie, v2exCookie = constants_1.MOCK_COOKIE) {
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
};
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
V2exController = __decorate([
    common_1.Controller('v2ex'),
    common_1.UseInterceptors(common_1.CacheInterceptor),
    __metadata("design:paramtypes", [index_service_1.V2exService])
], V2exController);
exports.V2exController = V2exController;
//# sourceMappingURL=index.controller.js.map