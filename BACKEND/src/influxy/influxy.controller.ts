import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { InfluxyService } from './influxy.service';
import { WebhookDto } from './dto/webhook.dto';
import { QueryDatesDto } from './dto/query-dates.dto';
import { DevicesService } from 'src/devices/devices.service';
import { InfluxData } from './dto/influx-data.dto';
import { Point } from '@influxdata/influxdb-client';
import { CompareDevicesDto } from './dto/compare-devices.dto';

@Controller('influxdb-devices')
export class InfluxyController {
  constructor(
    private readonly influxyService: InfluxyService,
    private readonly devicesService: DevicesService,
  ) {}

  @Get('total-energy')
  async getTotalEnergy(@Query() query: QueryDatesDto) {
    const { period = '7d', deviceReference } = query;
    const data = await this.influxyService.getTotalEnergyConsumption(
      period,
      deviceReference,
    );
    return { success: true, data };
  }
  @Get('total-energy-and-cost')
  async getTotalEnergyAndCost(@Query() query: QueryDatesDto) {
    const { period = '7d', deviceReference } = query;
    const rate = 0.22; // Replace with your actual electricity rate in TND
    const result = await this.influxyService.getTotalEnergyAndCost(
      period,
      deviceReference,
      rate,
    );
    return { success: true, data: result };
  }

  @Get('compare-devices')
  async compareDevices(@Query() query: CompareDevicesDto) {
    const { deviceReferences } = query;
    const period = '7d'; // Replace with your desired period
    const data = await this.influxyService.compareDevices(
      period,
      deviceReferences,
    );
    return { success: true, data };
  }

  @Get('peak-usage-times')
  async getPeakUsageTimes(@Query() query: QueryDatesDto) {
    const { period = '7d', deviceReference } = query;
    const data = await this.influxyService.getPeakUsageTimes(
      period,
      deviceReference,
    );
    return { success: true, data };
  }
  @Post()
  async handleWebhook(@Body() webhookDto: WebhookDto) {
    try {
      const deviceExists = await this.devicesService.findByRef(
        webhookDto.deviceReference,
      );
      if (!deviceExists) {
        throw new Error('Device reference not found in the database');
      }

      const Vrms = webhookDto.Vrms;
      const Irms = webhookDto.Irms;
      const Imean = webhookDto.Imean;
      const V = webhookDto.V;

      const S = Vrms * Irms; // Apparent Power
      const P = Imean * V; // Active Power
      const cosPhi = P / S; // Power Factor
      const Q = Math.sqrt(S ** 2 - P ** 2); // Reactive Power

      const point = new Point(process.env.INFLUXDB_BUCKET)
        .tag('device-reference', webhookDto.deviceReference)
        .floatField('S', S)
        .floatField('P', P)
        .floatField('cosPhi', cosPhi)
        .floatField('Q', Q)
        .timestamp(new Date());

      await this.influxyService.writePoint(point);

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

// import { Controller, Post, Body, Get, Query, Param } from '@nestjs/common';
// import { InfluxyService } from './influxy.service';
// import { Point } from '@influxdata/influxdb-client';
// import { WebhookDto } from './dto/webhook.dto';
// import { DevicesService } from 'src/devices/devices.service';

// @Controller('influxdb-devices')
// export class InfluxyController {
//   constructor(
//     private readonly influxyService: InfluxyService,
//     private readonly devicesService: DevicesService,
//   ) {}

//   // @Get(':deviceReference/current-usage')
//   // async getCurrentUsage(@Param('deviceReference') deviceReference: string) {
//   //   try {
//   //     const latestData =
//   //       await this.influxyService.getLatestData(deviceReference);
//   //     return { success: true, data: latestData };
//   //   } catch (error) {
//   //     return { success: false, error: error.message };
//   //   }
//   // }

//   // @Get(':deviceReference/historical-usage/:timePeriod')
//   // async getHistoricalUsage(
//   //   @Param('deviceReference') deviceReference: string,
//   //   @Param('timePeriod') timePeriod: string,
//   // ) {
//   //   try {
//   //     const historicalData = await this.influxyService.getHistoricalData(
//   //       deviceReference,
//   //       timePeriod,
//   //     );
//   //     return { success: true, data: historicalData };
//   //   } catch (error) {
//   //     return { success: false, error: error.message };
//   //   }
//   // }

//   // @Get(':deviceReference/peak-usage-times')
//   // async getPeakUsageTimes(@Param('deviceReference') deviceReference: string) {
//   //   try {
//   //     const peakUsageTimes =
//   //       await this.influxyService.getPeakUsageTimes(deviceReference);
//   //     return { success: true, data: peakUsageTimes };
//   //   } catch (error) {
//   //     return { success: false, error: error.message };
//   //   }
//   // }
//   // @Get(':deviceReference/real-time-cost') // New endpoint to get real-time cost estimate
//   // async getRealTimeCost(@Param('deviceReference') deviceReference: string) {
//   //   const rate = 0.21; // Electricity rate in TND per kWh
//   //   try {
//   //     const costEstimate = await this.influxyService.calculateCost(
//   //       deviceReference,
//   //       rate,
//   //     );
//   //     return { success: true, data: costEstimate };
//   //   } catch (error) {
//   //     return { success: false, error: error.message };
//   //   }
//   // }

//   // @Get(':deviceReference/historical-cost/:timePeriod')
//   // async getHistoricalCost(
//   //   @Param('deviceReference') deviceReference: string,
//   //   @Param('timePeriod') timePeriod: string,
//   // ) {
//   //   const rate = 0.21; // Electricity rate in TND per kWh
//   //   try {
//   //     const costEstimate = await this.influxyService.calculateHistoricalCost(
//   //       deviceReference,
//   //       timePeriod,
//   //       rate,
//   //     );
//   //     return { success: true, data: costEstimate };
//   //   } catch (error) {
//   //     return { success: false, error: error.message };
//   //   }
//   // }

//   // @Get(':deviceReference/efficiency-tips')
//   // async getEfficiencyTips(@Param('deviceReference') deviceReference: string) {
//   //   try {
//   //     const tips = await this.influxyService.getEfficiencyTips(deviceReference);
//   //     return { success: true, data: tips };
//   //   } catch (error) {
//   //     return { success: false, error: error.message };
//   //   }
//   // }

//   // @Get(':deviceReference/comparative-usage')
//   // async getComparativeUsage(@Param('deviceReference') deviceReference: string) {
//   //   try {
//   //     const comparisonData =
//   //       await this.influxyService.getComparativeUsage(deviceReference);
//   //     return { success: true, data: comparisonData };
//   //   } catch (error) {
//   //     return { success: false, error: error.message };
//   //   }
//   // }

//   // @Get('compare/:deviceReference1/:deviceReference2')
//   // async getDeviceComparison(
//   //   @Query('device1') device1: string,
//   //   @Query('device2') device2: string,
//   //   @Query('period') period: string,
//   // ) {
//   //   return this.influxyService.getDeviceComparison(device1, device2, period);
//   // }

// @Post()
// async handleWebhook(@Body() webhookDto: WebhookDto) {
//   try {
//     const deviceExists = await this.devicesService.findByRef(
//       webhookDto.deviceReference,
//     );
//     if (!deviceExists) {
//       throw new Error('Device reference not found in the database');
//     }

//     const Vrms = webhookDto.Vrms;
//     const Irms = webhookDto.Irms;
//     const Imean = webhookDto.Imean;
//     const V = webhookDto.V;

//     const S = Vrms * Irms; // Apparent Power
//     const P = Imean * V; // Active Power
//     const cosPhi = P / S; // Power Factor
//     const Q = Math.sqrt(S ** 2 - P ** 2); // Reactive Power

//     const point = new Point(process.env.INFLUXDB_BUCKET)
//       .tag('device-reference', webhookDto.deviceReference)
//       .floatField('S', S)
//       .floatField('P', P)
//       .floatField('cosPhi', cosPhi)
//       .floatField('Q', Q)
//       .timestamp(new Date());

//     await this.influxyService.writePoint(point);

//     return { success: true };
//   } catch (error) {
//     return { success: false, error: error.message };
//   }
// }
// }
