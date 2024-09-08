"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.alertSignal = void 0;
exports.orderAlert = orderAlert;
const wf = require("@temporalio/workflow");
exports.alertSignal = wf.defineSignal('alert');
async function orderAlert() {
    wf.setHandler(exports.alertSignal, (order) => {
        return order;
    });
}
//# sourceMappingURL=workflows.js.map