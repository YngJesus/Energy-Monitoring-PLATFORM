import { PickType } from '@nestjs/swagger';
import { CreateUsersDto } from 'src/users/dto/create-users.dto';

export class ForgetPasswordDto extends PickType(CreateUsersDto, [
  'Email',
] as const) {}
