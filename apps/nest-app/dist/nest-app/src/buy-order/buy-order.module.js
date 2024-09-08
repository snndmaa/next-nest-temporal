"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuyOrderModule = void 0;
const common_1 = require("@nestjs/common");
const buy_order_service_1 = require("./buy-order.service");
const buy_order_controller_1 = require("./buy-order.controller");
let BuyOrderModule = class BuyOrderModule {
};
exports.BuyOrderModule = BuyOrderModule;
exports.BuyOrderModule = BuyOrderModule = __decorate([
    (0, common_1.Module)({
        controllers: [buy_order_controller_1.BuyOrderController],
        providers: [buy_order_service_1.BuyOrderService],
    })
], BuyOrderModule);
//# sourceMappingURL=buy-order.module.js.map