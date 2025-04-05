import { Test, TestingModule } from '@nestjs/testing';
import { EnergyBillsController } from './energy-bills.controller';

describe('EnergyBillsController', () => {
  let controller: EnergyBillsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnergyBillsController],
    }).compile();

    controller = module.get<EnergyBillsController>(EnergyBillsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
