import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUsersDto } from 'src/users/dto/create-users.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/signIn.dto';
import { Role } from 'src/models/role.enum';
import { CreateAdminDto } from 'src/users/dto/create-admin.dto';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(createUsersDto: CreateUsersDto): Promise<any> {
    const { Password, Email, ...rest } = createUsersDto;
    const user = await this.usersService.findOne(Email);
    if (user) {
      return 'Email already in use';
    }
    this.usersService.addUser(createUsersDto);
    const token = this.jwtService.sign({ Email, rest });
    return { token };
  }

  async signIn(signInDto: SignInDto): Promise<{ token: string }> {
    const { Password, Email } = signInDto;

    const user = await this.usersService.findOne(Email);
    if (!user) {
      throw new UnauthorizedException('Email Not Registered');
    }
    const isMatch = await bcrypt.compare(Password, user.Password);
    if (!isMatch) {
      throw new UnauthorizedException('Incorrect Password');
    }
    //user.roles = Role.User;

    const token = this.jwtService.sign({
      Email: user.Email,
      roles: user.roles,
      id: user.id,
      firstName: user.firstName,
      linkedDevice: user.linkedDevice,
    });
    return { token };

    //return `Welcome  ${user.firstName}!`;
  }

  async signUpAdmin(createadminDto: CreateAdminDto): Promise<any> {
    const { Password, Email, ...rest } = createadminDto;
    const admin = await this.usersService.findAdmin(Email);
    if (admin) {
      return 'Email already in use';
    }
    this.usersService.addAdmin(createadminDto);
    const token = this.jwtService.sign({ Email, rest });
    return { token };
  }

  async signInAdmin(signInDto: SignInDto): Promise<{ token: string }> {
    const { Password, Email } = signInDto;

    const admin = await this.usersService.findAdmin(Email);
    if (!admin) {
      throw new UnauthorizedException('Email Not Found');
    }

    const isMatch = await bcrypt.compare(Password, admin.Password);
    if (!isMatch) {
      throw new UnauthorizedException('Incorrect Password');
    }

    console.log('Admin object:', admin); // Debugging

    const payload = {
      id: admin.id,
      Username: admin.Username,
      firstName: admin.firstName,
      lastName: admin.lastName,
      Number: admin.Number,
      Email: admin.Email,
      roles: admin.roles,
    };

    console.log('Payload for JWT:', payload); // Debugging

    const token = this.jwtService.sign(payload);
    return { token };
  }
}
