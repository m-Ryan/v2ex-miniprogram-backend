"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const index_controller_1 = require("./index.controller");
const index_service_1 = require("./index.service");
let V2exModule = class V2exModule {
};
V2exModule = __decorate([
    common_1.Module({
        imports: [
            common_1.CacheModule.register({
                ttl: 60,
                max: 300,
            }),
        ],
        controllers: [index_controller_1.V2exController],
        providers: [index_service_1.V2exService],
    })
], V2exModule);
exports.V2exModule = V2exModule;
//# sourceMappingURL=index.module.js.map