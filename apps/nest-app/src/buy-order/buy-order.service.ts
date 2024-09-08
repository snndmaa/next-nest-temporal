import { Injectable } from '@nestjs/common';
import { CreateBuyOrderDto } from './dto/create-buy-order.dto';
import { UpdateBuyOrderDto } from './dto/update-buy-order.dto';

@Injectable()
export class BuyOrderService {
  create(createBuyOrderDto: CreateBuyOrderDto) {
    return createBuyOrderDto;
  }

  findAll() {
    return `This action returns all buyOrder`;
  }

  findOne(id: number) {
    return `This action returns a #${id} buyOrder`;
  }

  update(id: number, updateBuyOrderDto: UpdateBuyOrderDto) {
    return `This action updates a #${id} buyOrder`;
  }

  remove(id: number) {
    return `This action removes a #${id} buyOrder`;
  }
}
