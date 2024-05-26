import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class WebhookDto {
  @IsNotEmpty()
  @IsString()
  deviceReference: string;

  // @IsNotEmpty()
  // @IsNumber()
  // value: number;

  @IsNotEmpty()
  @IsNumber()
  Vrms: number;

  @IsNotEmpty()
  @IsNumber()
  Irms: number;

  @IsNotEmpty()
  @IsNumber()
  Imean: number;

  @IsNotEmpty()
  @IsNumber()
  V: number;
}
