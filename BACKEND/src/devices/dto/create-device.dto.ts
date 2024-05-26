import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateDeviceDto {
  @IsNotEmpty()
  @IsString()
  Name: string;

  @IsNotEmpty()
  @IsString()
  Ref: string;

  @IsOptional()
  @IsString()
  Notes?: string;

  @IsNotEmpty()
  @IsString()
  Type: 'production' | 'consumption';
}
