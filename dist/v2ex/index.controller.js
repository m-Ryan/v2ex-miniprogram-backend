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
let V2exController = class V2exController {
    constructor(service) {
        this.service = service;
    }
    getHome(tab = 'tech') {
        return __awaiter(this, void 0, void 0, function* () {
            const pageUrl = `${constants_1.BASE_URL}/?tab=${tab}`;
            const html = yield this.service.getHomePage(pageUrl);
            return html;
        });
    }
    getList(page = 1) {
        return __awaiter(this, void 0, void 0, function* () {
            const pageUrl = `${constants_1.BASE_URL}/recent?p=${page}`;
            const html = yield this.service.getListPage(pageUrl);
            return html;
        });
    }
    getDetail(id = 1) {
        return __awaiter(this, void 0, void 0, function* () {
            const pageUrl = `${constants_1.BASE_URL}/t/${id}`;
            const html = yield this.service.getDetailPage(pageUrl);
            return html;
        });
    }
    getDetailReplay(id = 1, page = 1) {
        return __awaiter(this, void 0, void 0, function* () {
            const pageUrl = `${constants_1.BASE_URL}/t/${id}?p=${page}`;
            const html = yield this.service.getDetailReplay(pageUrl);
            return html;
        });
    }
    getNodeList(name, page = 1) {
        return __awaiter(this, void 0, void 0, function* () {
            const pageUrl = `${constants_1.BASE_URL}/go/${name}?p=${page}`;
            const html = yield this.service.getNodeList(pageUrl);
            return html;
        });
    }
    getUserInfo(nickname) {
        return __awaiter(this, void 0, void 0, function* () {
            const pageUrl = `${constants_1.BASE_URL}/member/${nickname}`;
            const html = yield this.service.getUserInfo(pageUrl);
            return html;
        });
    }
};
__decorate([
    common_1.Get('tab'),
    __param(0, common_1.Query('tab')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], V2exController.prototype, "getHome", null);
__decorate([
    common_1.Get('list'),
    __param(0, common_1.Query('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], V2exController.prototype, "getList", null);
__decorate([
    common_1.Get('detail'),
    __param(0, common_1.Query('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], V2exController.prototype, "getDetail", null);
__decorate([
    common_1.Get('detail-replay'),
    __param(0, common_1.Query('id')),
    __param(1, common_1.Query('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], V2exController.prototype, "getDetailReplay", null);
__decorate([
    common_1.Get('node-list'),
    __param(0, common_1.Query('name')),
    __param(1, common_1.Query('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], V2exController.prototype, "getNodeList", null);
__decorate([
    common_1.Get('user-info'),
    __param(0, common_1.Query('nickname')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], V2exController.prototype, "getUserInfo", null);
V2exController = __decorate([
    common_1.Controller('v2ex'),
    __metadata("design:paramtypes", [index_service_1.V2exService])
], V2exController);
exports.V2exController = V2exController;
//# sourceMappingURL=index.controller.js.map