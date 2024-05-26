import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ResetDocument = HydratedDocument<Reset>;

@Schema({ timestamps: true })
export class Reset {
  @Prop()
  Email: string;

  @Prop({ unique: true })
  token: string;
}

export const ResetSchema = SchemaFactory.createForClass(Reset);
