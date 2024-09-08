import { Server } from 'socket.io';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
export declare class OrderGateway {
    private readonly orderService;
    server: Server;
    constructor(orderService: OrderService);
    create(createOrderDto: CreateOrderDto): Promise<CreateOrderDto>;
    findAll(): string;
    findOne(id: number): string;
    update(updateOrderDto: UpdateOrderDto): string;
    remove(id: number): string;
}
