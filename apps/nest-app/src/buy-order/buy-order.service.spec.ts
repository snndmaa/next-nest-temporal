import { Test, TestingModule } from '@nestjs/testing';
import { BuyOrderService } from './buy-order.service';

describe('BuyOrderService', () => {
  let service: BuyOrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BuyOrderService],
    }).compile();

    service = module.get<BuyOrderService>(BuyOrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
