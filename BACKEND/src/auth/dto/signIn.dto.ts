// signIn.dto.ts

import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignInDto {
  @IsNotEmpty()
  @IsEmail()
  Email: string;

  @IsNotEmpty()
  Password: string;
}
