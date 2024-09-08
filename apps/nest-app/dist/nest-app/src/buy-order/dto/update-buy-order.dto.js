"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBuyOrderDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_buy_order_dto_1 = require("./create-buy-order.dto");
class UpdateBuyOrderDto extends (0, mapped_types_1.PartialType)(create_buy_order_dto_1.CreateBuyOrderDto) {
}
exports.UpdateBuyOrderDto = UpdateBuyOrderDto;
//# sourceMappingURL=update-buy-order.dto.js.map