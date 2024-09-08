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
exports.BuyOrderController = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@temporalio/client");
const workflows_1 = require("../../../temporal/src/workflows");
const shared_1 = require("../../../temporal/src/shared");
const buy_order_service_1 = require("./buy-order.service");
const create_buy_order_dto_1 = require("./dto/create-buy-order.dto");
const update_buy_order_dto_1 = require("./dto/update-buy-order.dto");
const temporalClient = new client_1.Client();
let temporalHandle;
async function startWorkflow() {
    try {
        temporalHandle = await temporalClient.workflow.start(workflows_1.orderAlert, {
            taskQueue: shared_1.taskQueueName,
            workflowId: shared_1.workflowId,
        });
        console.log('Workflow Started');
    }
    catch (error) {
        if (error.name === 'WorkflowExecutionAlreadyStartedError') {
            console.log('Workflow execution already started. Retrieving existing workflow handle.');
            temporalHandle = temporalClient.workflow.getHandle(shared_1.workflowId);
        }
        else {
            console.error('Error starting workflow:', error);
            process.exit(1);
        }
    }
}
startWorkflow().catch((err) => {
    console.error(err);
    process.exit(1);
});
let BuyOrderController = class BuyOrderController {
    constructor(buyOrderService) {
        this.buyOrderService = buyOrderService;
    }
    async create(createBuyOrderDto, res) {
        try {
            const order = await this.buyOrderService.create(createBuyOrderDto);
            try {
                await temporalHandle.signal(workflows_1.alertSignal, order);
            }
            catch (error) {
                if (error.name === 'WorkflowNotFoundError') {
                    console.log('Workflow execution already completed. Starting a new workflow.');
                    await startWorkflow();
                    await temporalHandle.signal(workflows_1.alertSignal, order);
                }
                else {
                    throw error;
                }
            }
            await temporalHandle.terminate('Ending workflow after order creation.');
            res.status(common_1.HttpStatus.CREATED).send();
        }
        catch (error) {
            console.error('An error occurred:', error);
            res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).send('An error occurred while processing your request.');
        }
    }
    findAll() {
        return this.buyOrderService.findAll();
    }
    findOne(id) {
        return this.buyOrderService.findOne(+id);
    }
    update(id, updateBuyOrderDto) {
        return this.buyOrderService.update(+id, updateBuyOrderDto);
    }
    remove(id) {
        return this.buyOrderService.remove(+id);
    }
};
exports.BuyOrderController = BuyOrderController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_buy_order_dto_1.CreateBuyOrderDto, Object]),
    __metadata("design:returntype", Promise)
], BuyOrderController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BuyOrderController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BuyOrderController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_buy_order_dto_1.UpdateBuyOrderDto]),
    __metadata("design:returntype", void 0)
], BuyOrderController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BuyOrderController.prototype, "remove", null);
exports.BuyOrderController = BuyOrderController = __decorate([
    (0, common_1.Controller)('buy-order'),
    __metadata("design:paramtypes", [buy_order_service_1.BuyOrderService])
], BuyOrderController);
//# sourceMappingURL=buy-order.controller.js.map