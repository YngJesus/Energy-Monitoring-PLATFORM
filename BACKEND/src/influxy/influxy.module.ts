import { Module } from '@nestjs/common';
import { InfluxyService } from './influxy.service';
import { InfluxyController } from './influxy.controller';
import { DevicesModule } from '../devices/devices.module';

@Module({
  imports: [DevicesModule],
  controllers: [InfluxyController],
  providers: [InfluxyService],
})
export class InfluxyModule {}
