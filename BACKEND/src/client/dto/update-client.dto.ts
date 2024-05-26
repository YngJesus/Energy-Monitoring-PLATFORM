import { PartialType } from '@nestjs/swagger';
import { CreateUsersDto } from 'src/users/dto/create-users.dto';

export class UpdateClientDto extends PartialType(CreateUsersDto) {}
