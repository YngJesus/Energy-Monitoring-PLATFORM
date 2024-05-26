import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role } from './role.enum';

export type UsersDocument = HydratedDocument<Users>;

@Schema({ timestamps: true })
export class Users {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true, errorMessage: 'Email must be unique' })
  Email: string;

  @Prop({ required: true })
  Number: number;

  @Prop({ required: true, enum: ['male', 'female'] }) // Adding Gender field with enum values
  Gender: string;

  @Prop({ required: true })
  Password: string;
  id: string;
  @Prop({ type: String, enum: Object.values(Role), default: Role.User }) // Adding the default role of 'user'
  roles: Role[];

  @Prop({ type: [String], default: [] })
  linkedDevice: string[];
}

export const UsersSchema = SchemaFactory.createForClass(Users);
