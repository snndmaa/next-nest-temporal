import { Module } from '@nestjs/common';
import { BuyOrderService } from './buy-order.service';
import { BuyOrderController } from './buy-order.controller';

@Module({
  controllers: [BuyOrderController],
  providers: [BuyOrderService],
})
export class BuyOrderModule {}
