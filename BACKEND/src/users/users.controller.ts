import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUsersDto } from './dto/create-users.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Users } from '../models/users.schema';
import { RolesGuard } from 'src/auth/Guards/roles.guard';
import { Role } from 'src/models/role.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuthGuard } from 'src/auth/Guards/auth.guard';
import { AssignDeviceDto } from 'src/devices/dto/assign-device.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from 'src/models/admin.schema';

// @ApiBearerAuth()
// @UseGuards(AuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //Statistic

  @ApiTags('Admin Statistic')
  @Roles(Role.Admin)
  @Get('gender-stat')
  async getUserCountsByGender(): Promise<any[]> {
    return this.usersService.getUsersCountByGender();
  }

  @ApiTags('Admin Statistic')
  @Roles(Role.Admin)
  @Get('users-device')
  async getUsersWithDevices(): Promise<
    { userName: string; deviceRefs: string[] }[]
  > {
    return this.usersService.getAllUsersWithDevices();
  }
  @Roles(Role.Admin)
  @ApiTags('Admin Statistic')
  @Get('new-users')
  async getNewUsersCount(): Promise<{ newUsersCount: number }> {
    const newUsersCount = await this.usersService.getNewUsersCount(7); // Count new users within the last 7 days
    return { newUsersCount };
  }
  @Roles(Role.Admin)
  @ApiTags('Admin Statistic')
  @Get('count')
  async getUsersCount(): Promise<{ Users_Number: number }> {
    const Users_Number = await this.usersService.getUsersCount();
    return { Users_Number };
  }
  @Roles(Role.Admin)
  @ApiTags('Admin Statistic')
  @Post(':id/assign-device')
  async assignDeviceToUser(
    @Param('id') id: string,
    @Body() assignDeviceDto: AssignDeviceDto,
  ): Promise<string> {
    return this.usersService.assignDeviceToUser(id, assignDeviceDto);
  }

  //Crud
  @Get('all-admins') // Define your GET route for admins inside the 'users' controller
  async getAllAdmins(): Promise<Admin[]> {
    // Specify the return type as Admin[]
    try {
      const admins = await this.usersService.getAllAdmins(); // Call the method from your service
      return admins; // Return the admins as the response
    } catch (error) {
      throw new Error(`Unable to fetch admins: ${error.message}`);
    }
  }
  @ApiTags('Admin Crud')
  @Roles(Role.Admin)
  @Get()
  async getUsers(
    @Query('pageNumber') pageNumber: 1,
    @Query('pageSize') pageSize: 4,
  ): Promise<Users[]> {
    return await this.usersService.getUsers(pageNumber, pageSize);
  }
  @ApiTags('Admin Crud')
  @Roles(Role.Admin)
  @Get(':id')
  async getOneUsers(@Param('id') id: string): Promise<Users> {
    return await this.usersService.getOneUsers(id);
  }
  @ApiTags('Admin Crud')
  @Roles(Role.Admin)
  @Post()
  async addUser(@Body() createUsersDto: CreateUsersDto): Promise<string> {
    return await this.usersService.addUser(createUsersDto);
  }
  @ApiTags('Admin Crud')
  @Roles(Role.Admin)
  @Patch(':id')
  async UpdateUsers(
    @Param('id') id: string,
    @Body() updateUsersDto: CreateUsersDto,
  ): Promise<string> {
    return await this.usersService.UpdateUsers(id, updateUsersDto);
  }
  @ApiTags('Admin Crud')
  @Roles(Role.Admin)
  @Delete(':id')
  async DeleteUsers(@Param('id') id: string): Promise<string> {
    return await this.usersService.DeleteUsers(id);
  }
  @ApiTags('Admin Crud')
  @Roles(Role.Admin)
  @Post('Search')
  async Search(@Query('key') key: string) {
    return await this.usersService.Search(key);
  }

  @Patch('update-admin/:id')
  async updateAdmin(
    @Param('id') id: string,
    @Body() updateAdminDto: UpdateAdminDto,
  ): Promise<string> {
    return this.usersService.updateAdmin(id, updateAdminDto);
  }
  @ApiTags('Admin Crud')
  @Roles(Role.Admin)
  @Get('Admin/:id')
  async getOneAdmin(@Param('id') id: string): Promise<Admin> {
    return await this.usersService.getOneAdmin(id);
  }
}
