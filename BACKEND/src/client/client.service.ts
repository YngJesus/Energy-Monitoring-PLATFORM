import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UpdateClientDto } from './dto/update-client.dto';
import { UsersService } from 'src/users/users.service';
import { ForgetPasswordDto } from './dto/Forgot-pass.dto';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Reset } from 'src/models/Reset.schema';
import { Model } from 'mongoose';
import { MailerService } from '@nestjs-modules/mailer';
import { ResetPassDto } from './dto/reset-password.dto';

@Injectable()
export class ClientService {
  constructor(
    private readonly usersService: UsersService,
    @InjectModel(Reset.name) private resetModel: Model<Reset>,
    private readonly mailerService: MailerService,
  ) {}

  async update(id: string, updateClientDto: UpdateClientDto) {
    return this.usersService.UpdateUsers(id, updateClientDto);
  }

  async remove(id: string) {
    this.usersService.DeleteUsers(id);
  }

  async Create(forgetPasswordDto: ForgetPasswordDto) {
    const { Email } = forgetPasswordDto;
    const user = await this.usersService.findOne(Email);

    if (!user) {
      throw new BadRequestException('The Email is Not Registered');
    }
    try {
      const token = crypto.randomBytes(18).toString('hex');

      // Use await to make sure the token is saved to the database
      await this.resetModel.create({ Email, token });

      const url = `https://localhost:3000/reset/${token}`;

      await this.mailerService.sendMail({
        to: Email,
        subject: 'Reset Password',
        html: `<h1>Click the link below to reset your password</h1><a href="${url}">Reset Password</a>`,
      });

      return {
        message: 'Email has been sent',
      };
    } catch (error) {
      throw new BadRequestException('An error occurred during password reset');
    }
  }

  async Reset(resetPassDto: ResetPassDto) {
    const { token, Password, Confirm_Password } = resetPassDto;

    if (Password !== Confirm_Password) {
      throw new BadRequestException('The two passwords do not match');
    }
    const reset = await this.resetModel.findOne({ token });

    if (!reset) {
      throw new NotFoundException('Invalid or expired token');
    }
    try {
      const user = await this.usersService.findOne(reset.Email);

      const hashedPassword = await bcrypt.hash(Password, 10);

      await this.usersService.Update(user.id, { Password: hashedPassword });
      await this.resetModel.deleteOne({ token });

      return {
        message: 'Password successfully updated',
      };
    } catch (error) {
      throw new BadRequestException('An error occurred during password reset');
    }
  }
}
