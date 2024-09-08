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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const client_1 = require("@temporalio/client");
const workflows_1 = require("../../../temporal/src/workflows");
const shared_1 = require("../../../temporal/src/shared");
const order_service_1 = require("./order.service");
const create_order_dto_1 = require("./dto/create-order.dto");
const update_order_dto_1 = require("./dto/update-order.dto");
const temporalClient = new client_1.Client();
const temporalHandle = temporalClient.workflow.getHandle(shared_1.workflowId);
async function run() {
    const _handle = await temporalClient.workflow.start(workflows_1.orderAlert, {
        taskQueue: shared_1.taskQueueName,
        workflowId: shared_1.workflowId,
    });
    console.log('Workflow Started');
}
run().catch((err) => {
    console.error(err);
    process.exit(1);
});
let OrderGateway = class OrderGateway {
    constructor(orderService) {
        this.orderService = orderService;
    }
    async create(createOrderDto) {
        const order = await this.orderService.create(createOrderDto);
        await temporalHandle.signal(workflows_1.alertSignal, order);
        this.server.emit('orderCreated', order);
        return order;
    }
    findAll() {
        return this.orderService.findAll();
    }
    findOne(id) {
        return this.orderService.findOne(id);
    }
    update(updateOrderDto) {
        return this.orderService.update(updateOrderDto.id, updateOrderDto);
    }
    remove(id) {
        return this.orderService.remove(id);
    }
};
exports.OrderGateway = OrderGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], OrderGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('createOrder'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_order_dto_1.CreateOrderDto]),
    __metadata("design:returntype", Promise)
], OrderGateway.prototype, "create", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('findAllOrder'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OrderGateway.prototype, "findAll", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('findOneOrder'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], OrderGateway.prototype, "findOne", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('updateOrder'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_order_dto_1.UpdateOrderDto]),
    __metadata("design:returntype", void 0)
], OrderGateway.prototype, "update", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('removeOrder'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], OrderGateway.prototype, "remove", null);
exports.OrderGateway = OrderGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        },
    }),
    __metadata("design:paramtypes", [order_service_1.OrderService])
], OrderGateway);
//# sourceMappingURL=order.gateway.js.map