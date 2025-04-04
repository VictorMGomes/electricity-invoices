import { Module } from '@nestjs/common';
import { ConfigurationService } from './system.service';

@Module({
  providers: [ConfigurationService],
  exports: [ConfigurationService],
})
export class ConfigModule {}
