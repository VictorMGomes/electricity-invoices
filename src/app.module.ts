import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { PrismaService } from '@src/shared/services/prisma/prisma.service';
import { ConfigModule } from '@src/shared/services/system/system.module';

@Module({
  imports: [UsersModule, ConfigModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
