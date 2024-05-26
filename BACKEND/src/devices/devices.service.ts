import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Device, DeviceSchema } from 'src/models/devices.schema';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';

@Injectable()
export class DevicesService {
  constructor(@InjectModel(Device.name) private deviceModel: Model<Device>) {}

  async getDevices(pageNumber: number, pageSize: number): Promise<Device[]> {
    const offset = (pageNumber - 1) * pageSize;

    try {
      const devices = await this.deviceModel
        .find()
        .skip(offset)
        .limit(pageSize)
        .exec();
      return devices;
    } catch (error) {
      // Handle any errors appropriately
      throw new Error(`Unable to fetch users: ${error.message}`);
    }
  }

  async create(createDeviceDto: CreateDeviceDto): Promise<string> {
    const newDevice = new this.deviceModel(createDeviceDto);
    try {
      await newDevice.save();
      return `${newDevice} has been Created in the database`;
    } catch (error) {
      if (error.code === 11000) {
        return 'Duplicate Reference error: This Reference is already in use';
      }
      console.error(error.message);
      return 'Error creating device';
    }
  }

  async findById(id: string): Promise<Device> {
    return await this.deviceModel.findById(id);
  }

  async update(id: string, updateDeviceDto: UpdateDeviceDto): Promise<Device> {
    return await this.deviceModel.findByIdAndUpdate(id, updateDeviceDto, {
      new: true,
    });
  }

  async delete(id: string): Promise<Device> {
    return await this.deviceModel.findByIdAndDelete(id);
  }

  async Search(key: string) {
    const keyword = key
      ? {
          $or: [{ Name: RegExp(key, 'i') }, { Ref: RegExp(key, 'i') }],
        }
      : {};
    const Devices = await this.deviceModel.find(keyword).select('-__v').exec();
    return Devices;
  }
  async findByRef(ref: string): Promise<Device | null> {
    return await this.deviceModel.findOne({ Ref: ref }).exec();
  }

  async getDevicesCount(): Promise<number> {
    try {
      const Devices_Number = await this.deviceModel.countDocuments().exec();
      return Devices_Number;
    } catch (error) {
      throw new Error(`Unable to fetch user count: ${error.message}`);
    }
  }
  async getNewDevicesCount(lastDays: number): Promise<number> {
    try {
      const date = new Date();
      date.setDate(date.getDate() - lastDays); // Subtract 'lastDays' from current date
      const count = await this.deviceModel
        .countDocuments({ createdAt: { $gte: date } })
        .exec();
      return count;
    } catch (error) {
      throw new Error(`Unable to fetch new user count: ${error.message}`);
    }
  }
  async getAssignedDevicesCount(): Promise<number> {
    try {
      const AssignedCount = await this.deviceModel
        .countDocuments({ Status: 'Assigned' })
        .exec();
      return AssignedCount;
    } catch (error) {
      throw new Error(
        `Unable to fetch Assigned devices count: ${error.message}`,
      );
    }
  }

  async getUnAssignedDevicesCount(): Promise<number> {
    try {
      const UnAssignedCount = await this.deviceModel
        .countDocuments({ Status: 'UnAssigned' })
        .exec();
      return UnAssignedCount;
    } catch (error) {
      throw new Error(
        `Unable to fetch UnAssigned devices count: ${error.message}`,
      );
    }
  }

  async getDeviceCountsByType(): Promise<any[]> {
    try {
      const deviceCounts = await this.deviceModel.aggregate([
        {
          $group: {
            _id: '$Type',
            count: { $sum: 1 },
          },
        },
      ]);

      return deviceCounts;
    } catch (error) {
      throw new Error(
        `Unable to fetch device counts by type: ${error.message}`,
      );
    }
  }
}
