import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role } from './role.enum';

export type adminDocument = HydratedDocument<Admin>;

@Schema({ timestamps: true })
export class Admin {
  [x: string]: any;
  @Prop({ required: true })
  Username: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true, errorMessage: 'Email must be unique' })
  Email: string;

  @Prop({ required: true })
  Number: number;

  @Prop({ required: true })
  Password: string;
  @Prop({ type: String, enum: Object.values(Role), default: Role.Admin })
  roles: Role[];
}

export const adminSchema = SchemaFactory.createForClass(Admin);
