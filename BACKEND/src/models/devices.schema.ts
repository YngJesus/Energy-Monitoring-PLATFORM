import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsIn,
  IsBoolean,
} from 'class-validator';
import { HydratedDocument } from 'mongoose';

export type DeviceDocument = HydratedDocument<Device>;

@Schema({ timestamps: true })
export class Device {
  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  Name: string;

  @Prop({ required: true, unique: true })
  @IsString()
  @IsNotEmpty()
  Ref: string;

  @Prop()
  @IsString()
  @IsOptional()
  Notes?: string;

  @Prop({ required: true })
  @IsString()
  @IsIn(['production', 'consumption'])
  Type: 'production' | 'consumption';

  @Prop({ default: 'UnAssigned' })
  @IsString()
  @IsIn(['UnAssigned', 'Assigned'])
  Status: 'UnAssigned' | 'Assigned';
}

export const DeviceSchema = SchemaFactory.createForClass(Device);
