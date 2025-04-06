import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { BillingModule } from './modules/billings/billing.module';
import { PrismaService } from '@src/shared/services/prisma/prisma.service';
import { ConfigModule } from '@src/shared/services/system/system.module';

@Module({
  imports: [UsersModule, ConfigModule, BillingModule],
  controllers: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
