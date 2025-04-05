import { Module } from '@nestjs/common';
import { EnergyBillsService } from './energy-bills.service';
import { EnergyBillsController } from './energy-bills.controller';
import { PrismaModule } from '@src/shared/services/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [EnergyBillsService],
  controllers: [EnergyBillsController],
})
export class EnergyBillsModule {}
