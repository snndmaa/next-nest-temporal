import { CreateBuyOrderDto } from './dto/create-buy-order.dto';
import { UpdateBuyOrderDto } from './dto/update-buy-order.dto';
export declare class BuyOrderService {
    create(createBuyOrderDto: CreateBuyOrderDto): CreateBuyOrderDto;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateBuyOrderDto: UpdateBuyOrderDto): string;
    remove(id: number): string;
}
