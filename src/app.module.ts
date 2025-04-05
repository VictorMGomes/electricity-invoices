import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { EnergyBillsModule } from './modules/energy-bills/energy-bills.module';
import { PrismaService } from '@src/shared/services/prisma/prisma.service';
import { ConfigModule } from '@src/shared/services/system/system.module';

@Module({
  imports: [UsersModule, ConfigModule, EnergyBillsModule],
  controllers: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
