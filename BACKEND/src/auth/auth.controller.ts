import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { CreateUsersDto } from 'src/users/dto/create-users.dto';
import { AuthGuard } from './Guards/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateAdminDto } from 'src/users/dto/create-admin.dto';

@ApiTags('Authentification')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('Register')
  signUp(@Body() createUsersDto: CreateUsersDto): Promise<{ token: string }> {
    return this.authService.signUp(createUsersDto);
    //return 'Your account has been created!';
  }
  @Post('SignUp')
  signUpAdmin(
    @Body() createadminDto: CreateAdminDto,
  ): Promise<{ token: string }> {
    return this.authService.signUpAdmin(createadminDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('Client/Login')
  signIn(@Body() signInDto: SignInDto): Promise<{ token: string }> {
    return this.authService.signIn(signInDto);
  }
  @HttpCode(HttpStatus.OK)
  @Post('Admin/Login')
  signInAdmin(@Body() signInDto: SignInDto): Promise<{ token: string }> {
    return this.authService.signInAdmin(signInDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
