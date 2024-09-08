import { Response } from 'express';
import { BuyOrderService } from './buy-order.service';
import { CreateBuyOrderDto } from './dto/create-buy-order.dto';
import { UpdateBuyOrderDto } from './dto/update-buy-order.dto';
export declare class BuyOrderController {
    private readonly buyOrderService;
    constructor(buyOrderService: BuyOrderService);
    create(createBuyOrderDto: CreateBuyOrderDto, res: Response): Promise<void>;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateBuyOrderDto: UpdateBuyOrderDto): string;
    remove(id: string): string;
}
