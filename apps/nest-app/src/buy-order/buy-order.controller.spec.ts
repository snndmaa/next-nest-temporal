import { Test, TestingModule } from '@nestjs/testing';
import { BuyOrderController } from './buy-order.controller';
import { BuyOrderService } from './buy-order.service';

describe('BuyOrderController', () => {
  let controller: BuyOrderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BuyOrderController],
      providers: [BuyOrderService],
    }).compile();

    controller = module.get<BuyOrderController>(BuyOrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
