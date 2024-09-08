import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

import { Server } from 'socket.io';
import { Client, WorkflowHandle } from '@temporalio/client';

import { alertSignal, orderAlert } from '../../../temporal/src/workflows';
import { taskQueueName, workflowId } from '../../../temporal/src/shared';

import { BuyOrderService } from './buy-order.service';
import { CreateBuyOrderDto } from './dto/create-buy-order.dto';
import { UpdateBuyOrderDto } from './dto/update-buy-order.dto';

const temporalClient = new Client();
let temporalHandle: WorkflowHandle;

async function startWorkflow(): Promise<void> {
  try {
    // Start the workflow and assign it to `temporalHandle`
    temporalHandle = await temporalClient.workflow.start(orderAlert, {
      taskQueue: taskQueueName,
      workflowId: workflowId,
    });
    console.log('Workflow Started');
  } catch (error) {
    if (error.name === 'WorkflowExecutionAlreadyStartedError') {
      console.log('Workflow execution already started. Retrieving existing workflow handle.');
      // Retrieve the existing workflow handle instead of starting a new one
      temporalHandle = temporalClient.workflow.getHandle(workflowId);
    } else {
      // Re-throw the error if it's not WorkflowExecutionAlreadyStartedError
      console.error('Error starting workflow:', error);
      process.exit(1);
    }
  }
}

// Call the function to start or get the workflow handle
startWorkflow().catch((err) => {
  console.error(err);
  process.exit(1);
});

@Controller('buy-order')
export class BuyOrderController {
  constructor(private readonly buyOrderService: BuyOrderService) {}

  @Post()
  async create(@Body() createBuyOrderDto: CreateBuyOrderDto, @Res() res: Response) {
    try {
      // Create the order using the order service
      const order = await this.buyOrderService.create(createBuyOrderDto); // Ensure to await the service call
    
      // Check if the workflow is already completed before sending a signal
      try {
        await temporalHandle.signal(alertSignal, order);
      } catch (error) {
        if (error.name === 'WorkflowNotFoundError') {
          console.log('Workflow execution already completed. Starting a new workflow.');
          // Restart the workflow if it has already completed
          await startWorkflow();
          // After restarting, signal the new workflow
          await temporalHandle.signal(alertSignal, order);
        } else {
          // Re-throw the error if it's not WorkflowNotFoundError
          throw error;
        }
      }

      // Workflow Ending Logic (optional, you may remove this if you don't want to end after each call)
      await temporalHandle.terminate('Ending workflow after order creation.');

      // Notify all clients that the order was created  
      res.status(HttpStatus.CREATED).send();
    } catch (error) {
      console.error('An error occurred:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('An error occurred while processing your request.');
    }
  }

  @Get()
  findAll() {
    return this.buyOrderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.buyOrderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBuyOrderDto: UpdateBuyOrderDto) {
    return this.buyOrderService.update(+id, updateBuyOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.buyOrderService.remove(+id);
  }
}
