import { Worker } from '@temporalio/worker';
import { taskQueueName } from './shared'

async function run() {
  const worker = await Worker.create({
    workflowsPath: require.resolve('./workflows'),
    taskQueue: taskQueueName,
  });
  await worker.run();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
