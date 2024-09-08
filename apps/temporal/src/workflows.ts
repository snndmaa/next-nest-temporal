import * as wf from '@temporalio/workflow';

export const alertSignal = wf.defineSignal<[order: any]>('alert');

export async function orderAlert(): Promise<void> {
  wf.setHandler(alertSignal, (order) => {
    return order
  });
}