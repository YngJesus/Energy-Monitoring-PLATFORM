import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from '../models/users.schema';
import { Admin, adminSchema } from 'src/models/admin.schema';
import { DevicesModule } from 'src/devices/devices.module';
import { Device, DeviceSchema } from 'src/models/devices.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Users.name, schema: UsersSchema },
      { name: Admin.name, schema: adminSchema },
      { name: Device.name, schema: DeviceSchema },
    ]),
  ],
  exports: [UsersService],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
