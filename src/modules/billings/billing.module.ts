import { Module } from '@nestjs/common';
import { BillingService } from './billing.service';
import { BillingController } from './billing.controller';
import { PrismaModule } from '@src/shared/services/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [BillingService],
  controllers: [BillingController],
})
export class BillingModule {}
