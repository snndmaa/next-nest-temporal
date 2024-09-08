"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@temporalio/client");
const workflows_1 = require("./workflows");
const shared_1 = require("./shared");
async function run() {
    const client = new client_1.Client();
    const _handle = await client.workflow.start(workflows_1.orderAlert, {
        taskQueue: shared_1.taskQueueName,
        workflowId: shared_1.workflowId,
    });
    console.log("Workflow Started!");
}
run().catch((err) => {
    console.error(err);
    process.exit(1);
});
//# sourceMappingURL=startWorkflow.js.map