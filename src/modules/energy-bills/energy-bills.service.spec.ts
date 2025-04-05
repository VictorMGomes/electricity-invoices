import { Test, TestingModule } from '@nestjs/testing';
import { EnergyBillsService } from './energy-bills.service';

describe('EnergyBillsService', () => {
  let service: EnergyBillsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnergyBillsService],
    }).compile();

    service = module.get<EnergyBillsService>(EnergyBillsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
