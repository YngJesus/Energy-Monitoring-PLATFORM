import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';
export class ResetPassDto {
  @IsNotEmpty()
  token: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: 'The min length of password is 8 ' })
  @MaxLength(20, {
    message: "The password can't accept more than 20 characters ",
  })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, and one number.',
  })
  Password: string;

  @IsNotEmpty()
  @IsString()
  Confirm_Password: string;
}
