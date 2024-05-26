import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ClientModule } from './client/client.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { DevicesModule } from './devices/devices.module';
import { InfluxyService } from './influxy/influxy.service';
import { InfluxyController } from './influxy/influxy.controller';
import { InfluxyModule } from './influxy/influxy.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    ClientModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    DevicesModule,
    InfluxyModule,
  ],
  controllers: [AppController, InfluxyController],
  providers: [AppService, InfluxyService],
})
export class AppModule {}
