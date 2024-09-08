"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const worker_1 = require("@temporalio/worker");
const shared_1 = require("./shared");
async function run() {
    const worker = await worker_1.Worker.create({
        workflowsPath: require.resolve('./workflows'),
        taskQueue: shared_1.taskQueueName,
    });
    await worker.run();
}
run().catch((err) => {
    console.error(err);
    process.exit(1);
});
//# sourceMappingURL=worker.js.map