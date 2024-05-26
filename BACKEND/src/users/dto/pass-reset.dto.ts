import { PickType } from '@nestjs/mapped-types';
import { CreateUsersDto } from './create-users.dto.js';

export class UpdatePassDto extends PickType(CreateUsersDto, [
  'Password',
] as const) {}
