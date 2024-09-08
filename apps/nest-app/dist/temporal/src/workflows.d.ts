import * as wf from '@temporalio/workflow';
export declare const alertSignal: wf.SignalDefinition<[order: any], string>;
export declare function orderAlert(): Promise<void>;
