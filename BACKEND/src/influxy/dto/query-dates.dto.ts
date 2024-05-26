import { IsOptional, IsString, IsEnum } from 'class-validator';

export class QueryDatesDto {
  @IsOptional()
  @IsEnum(['7d', '1mo'], { message: 'period must be either "7d" or "1mo"' })
  period?: string;

  @IsOptional()
  @IsString()
  deviceReference?: string;
}
