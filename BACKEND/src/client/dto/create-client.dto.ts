import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsNumber,
  MinLength,
  MaxLength,
  Matches,
  IsIn,
} from 'class-validator';
export class CreateClientDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  Email: string;

  @IsNotEmpty()
  @IsNumber()
  Number: number;

  @IsNotEmpty()
  @IsString()
  @IsIn(['male', 'female'], { message: 'Gender must be either male or female' })
  Gender: string;

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
}
