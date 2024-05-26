import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUsersDto } from './dto/create-users.dto.js';
import { UpdateUsersDto } from './dto/update-users.dto.js';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from '../models/users.schema.js';
import * as bcrypt from 'bcrypt';
import { Admin } from 'src/models/admin.schema';
import { UpdateClientDto } from 'src/client/dto/update-client.dto.js';
import { UpdatePassDto } from './dto/pass-reset.dto.js';
import { CreateAdminDto } from './dto/create-admin.dto.js';
import { AssignDeviceDto } from 'src/devices/dto/assign-device.dto.js';
import { Device } from 'src/models/devices.schema';
import { UpdateAdminDto } from './dto/update-admin.dto.js';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private usersModel: Model<Users>,
    @InjectModel(Admin.name) private adminModel: Model<Admin>,
    @InjectModel(Device.name) private deviceModel: Model<Device>,
  ) {}

  async findOne(email: string): Promise<Users> {
    return this.usersModel.findOne({ Email: email });
  }

  async findAdmin(email: string): Promise<Admin> {
    return this.adminModel.findOne({ Email: email });
  }

  async addAdmin(createadminDto: CreateAdminDto): Promise<string> {
    const { Password, ...rest } = createadminDto;
    const hashedPassword = await bcrypt.hash(Password, 10);
    const createdAdmin = new this.adminModel({
      ...rest,
      Password: hashedPassword,
    });

    try {
      await createdAdmin.save();
      return `${createdAdmin.Username} has been Created in the database`;
    } catch (error) {
      if (error.code === 11000) {
        return 'Duplicate email error: This Email is already in use';
      }
      console.error(error.message);
      return 'Error creating user';
    }
  }

  async updateAdmin(
    id: string,
    updateAdminDto: UpdateAdminDto,
  ): Promise<string> {
    const { Password, ...rest } = updateAdminDto;
    try {
      const hashedPassword = await bcrypt.hash(Password, 10);
      const existingEmail = await this.adminModel
        .findOne({ Email: updateAdminDto.Email })
        .exec();
      if (existingEmail && existingEmail.id !== id) {
        return 'This Email is already in use';
      }
      const user = await this.adminModel.findById(id).exec();
      if (user) {
        user.firstName = updateAdminDto.firstName;
        user.lastName = updateAdminDto.lastName;
        user.Email = updateAdminDto.Email;
        user.Number = updateAdminDto.Number;
        user.Username = updateAdminDto.Username;
        user.Password = hashedPassword;
        user.save();

        return `${updateAdminDto.firstName} has been Updated`;
      } else {
        return 'User Not Found';
      }
    } catch (error) {
      throw error;
    }
  }

  async getUsers(pageNumber: number, pageSize: number): Promise<Users[]> {
    const offset = (pageNumber - 1) * pageSize;

    try {
      const users = await this.usersModel
        .find()
        .skip(offset)
        .limit(pageSize)
        .exec();
      return users;
    } catch (error) {
      // Handle any errors appropriately
      throw new Error(`Unable to fetch users: ${error.message}`);
    }
  }

  async getOneUsers(id: string): Promise<Users> {
    const user = await this.usersModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
  async getOneAdmin(id: string): Promise<Admin> {
    const admin = await this.adminModel.findById(id).exec();
    if (!admin) {
      throw new NotFoundException('User not found');
    }
    return admin;
  }
  async getAllAdmins(): Promise<Admin[]> {
    try {
      const admins = await this.adminModel.find().exec();
      return admins;
    } catch (error) {
      throw new Error(`Unable to fetch admins: ${error.message}`);
    }
  }

  async addUser(createUsersDto: CreateUsersDto): Promise<string> {
    const { Password, ...rest } = createUsersDto;
    const hashedPassword = await bcrypt.hash(Password, 10);
    const createdUser = new this.usersModel({
      ...rest,
      Password: hashedPassword,
    });
    try {
      await createdUser.save();
      return `${createdUser.firstName} has been Created in the database`;
    } catch (error) {
      if (error.code === 11000) {
        return 'Duplicate email error: This Email is already in use';
      }
      console.error(error.message);
      return 'Error creating user';
    }
  }

  async UpdateUsers(
    id: string,
    updateUsersDto: UpdateUsersDto,
  ): Promise<string> {
    const { Password, ...rest } = updateUsersDto;
    try {
      const hashedPassword = await bcrypt.hash(Password, 10);
      const existingEmail = await this.usersModel
        .findOne({ Email: updateUsersDto.Email })
        .exec();
      if (existingEmail && existingEmail.id !== id) {
        return 'This Email is already in use';
      }
      const user = await this.usersModel.findById(id).exec();
      if (user) {
        user.firstName = updateUsersDto.firstName;
        user.lastName = updateUsersDto.lastName;
        user.Email = updateUsersDto.Email;
        user.Number = updateUsersDto.Number;
        user.Gender = updateUsersDto.Gender;
        user.Password = hashedPassword;
        user.save();

        return `${updateUsersDto.firstName} has been Updated`;
      } else {
        return 'User Not Found';
      }
    } catch (error) {
      throw error;
    }
  }
  async Update(id: string, updatePassDto: UpdatePassDto): Promise<any> {
    const { Password } = updatePassDto;
    const user = await this.usersModel.findById(id).exec();
    if (user) {
      user.Password = Password;
      user.save();
    }
  }

  async DeleteUsers(id: string): Promise<string> {
    const user = await this.usersModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.usersModel.deleteOne({ _id: id }).exec();
    return `${user.firstName} has been deleted from the database`;
  }

  async Search(key: string) {
    const keyword = key
      ? {
          $or: [
            { firstName: RegExp(key, 'i') },
            { lastName: RegExp(key, 'i') },
            { Email: RegExp(key, 'i') },
          ],
        }
      : {};
    const users = await this.usersModel.find(keyword).select('-__v').exec();
    return users;
  }
  async getUsersCount(): Promise<number> {
    try {
      const Users_Number = await this.usersModel.countDocuments().exec();
      return Users_Number;
    } catch (error) {
      throw new Error(`Unable to fetch user count: ${error.message}`);
    }
  }
  async getNewUsersCount(lastDays: number): Promise<number> {
    try {
      const date = new Date();
      date.setDate(date.getDate() - lastDays); // Subtract 'lastDays' from current date
      const count = await this.usersModel
        .countDocuments({ createdAt: { $gte: date } })
        .exec();
      return count;
    } catch (error) {
      throw new Error(`Unable to fetch new user count: ${error.message}`);
    }
  }

  async assignDeviceToUser(
    id: string,
    assignDeviceDto: AssignDeviceDto,
  ): Promise<string> {
    const { Ref } = assignDeviceDto;

    try {
      const user = await this.usersModel.findById(id).exec();
      if (!user) {
        throw new NotFoundException('User not found');
      }

      // Check if the device with the provided reference exists
      const device = await this.deviceModel.findOne({ Ref }).exec();
      if (!device) {
        throw new NotFoundException('Ref not found');
      }

      // Check if the device is already assigned to a user
      if (device.Status === 'Assigned') {
        throw new BadRequestException(
          'Device is already assigned to another user',
        );
      }

      // Assign the device to the user
      user.linkedDevice.push(Ref);
      await user.save();

      // Change the device status to Assigned
      device.Status = 'Assigned';
      await device.save();

      return `Device ${Ref} has been assigned to user ${user.firstName} and is now assigned`;
    } catch (error) {
      throw error;
    }
  }

  async getAllUsersWithDevices(): Promise<any> {
    try {
      const users = await this.usersModel.find().exec();
      if (!users) {
        throw new NotFoundException('No users found');
      }

      // Map the users to the desired format and filter out users without devices
      const usersWithDevices = users
        .map((user) => ({
          userName: user.firstName,
          deviceRefs: user.linkedDevice,
        }))
        .filter((user) => user.deviceRefs.length > 0);

      return usersWithDevices;
    } catch (error) {
      throw error;
    }
  }
  async getUsersCountByGender(): Promise<any[]> {
    try {
      const userCounts = await this.usersModel.aggregate([
        {
          $group: {
            _id: '$Gender',
            count: { $sum: 1 },
          },
        },
      ]);

      return userCounts;
    } catch (error) {
      throw new Error(`Unable to fetch user counts Gender: ${error.message}`);
    }
  }
}
