import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { DevicesService } from './devices.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { Device } from 'src/models/devices.schema';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/Guards/roles.guard';
import { Role } from 'src/models/role.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuthGuard } from 'src/auth/Guards/auth.guard';

@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  //Statistic

  @ApiTags('Admin Statistic')
  @Roles(Role.Admin)
  @Get('type-stat')
  async getDeviceCountsByType(): Promise<any[]> {
    return this.devicesService.getDeviceCountsByType();
  }

  @Roles(Role.Admin)
  @ApiTags('Admin Statistic')
  @Get('new-Devices')
  async getNewDevicesCount(): Promise<{ newDevicesCount: number }> {
    const newDevicesCount = await this.devicesService.getNewDevicesCount(7); // Count new users within the last 7 days
    return { newDevicesCount };
  }
  @Roles(Role.Admin)
  @ApiTags('Admin Statistic')
  @Get('count')
  async getDevicesCount(): Promise<{ Devices_Number: number }> {
    const Devices_Number = await this.devicesService.getDevicesCount();
    return { Devices_Number };
  }
  @Roles(Role.Admin)
  @ApiTags('Admin Statistic')
  @Get('Assigned-count')
  async getAssignedDevicesCount(): Promise<number> {
    return this.devicesService.getAssignedDevicesCount();
  }
  @Roles(Role.Admin)
  @ApiTags('Admin Statistic')
  @Get('UnAssigned-count')
  async getUnAssignedDevicesCount(): Promise<number> {
    return this.devicesService.getUnAssignedDevicesCount();
  }

  //Devices Crud
  @ApiTags('Admin Crud')
  @Roles(Role.Admin)
  @Post()
  async createDevice(
    @Body() createDeviceDto: CreateDeviceDto,
  ): Promise<string> {
    return await this.devicesService.create(createDeviceDto);
  }

  @ApiTags('Admin Crud')
  @Roles(Role.Admin)
  @Get()
  async getDevices(
    @Query('pageNumber') pageNumber: 1,
    @Query('pageSize') pageSize: 4,
  ): Promise<Device[]> {
    return await this.devicesService.getDevices(pageNumber, pageSize);
  }

  @ApiTags('Admin Crud')
  @Roles(Role.Admin)
  @Get(':id')
  async findById(@Param('id') id: string): Promise<Device> {
    return await this.devicesService.findById(id);
  }

  @ApiTags('Admin Crud')
  @Roles(Role.Admin)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDeviceDto: UpdateDeviceDto,
  ): Promise<Device> {
    return await this.devicesService.update(id, updateDeviceDto);
  }

  @ApiTags('Admin Crud')
  @Roles(Role.Admin)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Device> {
    return await this.devicesService.delete(id);
  }

  @ApiTags('Admin Crud')
  @Roles(Role.Admin)
  @Post('Search')
  async Search(@Query('key') key: string) {
    return await this.devicesService.Search(key);
  }
}
