import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { PrismaService } from '@src/shared/services/prisma/prisma.service';
import { ConfigModule } from '@src/shared/services/system/system.module';

@Module({
  imports: [UsersModule, ConfigModule],
  controllers: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
