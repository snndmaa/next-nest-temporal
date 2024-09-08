import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Client } from '@temporalio/client';
import { alertSignal, orderAlert } from '../../../temporal/src/workflows';
import { taskQueueName, workflowId } from '../../../temporal/src/shared';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

const temporalClient = new Client();
const temporalHandle = temporalClient.workflow.getHandle(workflowId);

async function run(): Promise<void> {
  const _handle = await temporalClient.workflow.start(orderAlert, {
    taskQueue: taskQueueName,
    workflowId: workflowId,
  });

  console.log('Workflow Started');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

@WebSocketGateway({
  cors: {
    origin: '*', 
  },
})
export class OrderGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly orderService: OrderService) {}

  @SubscribeMessage('createOrder')
  async create(@MessageBody() createOrderDto: CreateOrderDto) {
    // Create the order using the order service
    const order = await this.orderService.create(createOrderDto);

    // Emit the Temporal signal with the order data
    await temporalHandle.signal(alertSignal, order); // Pass the `order` object to the signal

    // Notify all clients that the order was created
    this.server.emit('orderCreated', order);

    return order;  
  }

  @SubscribeMessage('findAllOrder')
  findAll() {
    return this.orderService.findAll();
  }

  @SubscribeMessage('findOneOrder')
  findOne(@MessageBody() id: number) {
    return this.orderService.findOne(id);
  }

  @SubscribeMessage('updateOrder')
  update(@MessageBody() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(updateOrderDto.id, updateOrderDto);
  }

  @SubscribeMessage('removeOrder')
  remove(@MessageBody() id: number) {
    return this.orderService.remove(id);
  }
}
