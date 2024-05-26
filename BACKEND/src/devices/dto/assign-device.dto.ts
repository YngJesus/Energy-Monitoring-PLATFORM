import { PickType } from '@nestjs/mapped-types';
import { CreateDeviceDto } from './create-device.dto';
import { ApiProperty } from '@nestjs/swagger';

export class AssignDeviceDto extends PickType(CreateDeviceDto, [
  'Ref',
] as const) {
  @ApiProperty()
  Ref: string;
}
