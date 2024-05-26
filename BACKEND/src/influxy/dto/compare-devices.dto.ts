import { IsString, IsArray, ArrayMinSize } from 'class-validator';

export class CompareDevicesDto {
  @IsArray()
  @ArrayMinSize(2)
  @IsString({ each: true })
  deviceReferences: string[];
}
