import { Injectable } from '@nestjs/common';
import {
  InfluxDB,
  Point,
  FluxTableMetaData,
} from '@influxdata/influxdb-client';
import * as dotenv from 'dotenv';
import { InfluxData } from './dto/influx-data.dto';

@Injectable()
export class InfluxyService {
  private readonly client: InfluxDB;

  constructor() {
    dotenv.config();
    this.client = new InfluxDB({
      url: process.env.INFLUXDB_URL,
      token: process.env.INFLUXDB_TOKEN,
    });
  }

  async writePoint(point: Point) {
    try {
      const writeApi = this.client.getWriteApi(
        process.env.INFLUXDB_ORG,
        process.env.INFLUXDB_BUCKET,
      );
      console.log('About to write point to InfluxDB:', point);

      writeApi.writePoint(point);
      await writeApi.close();
      console.log('Successfully wrote point to InfluxDB');
    } catch (error) {
      console.error('Failed to write point to InfluxDB:', error.message);
      throw new Error(`Failed to write point to InfluxDB: ${error.message}`);
    }
  }

  async queryData(query: string) {
    const queryApi = this.client.getQueryApi(process.env.INFLUXDB_ORG);
    const result = [];

    return new Promise((resolve, reject) => {
      queryApi.queryRows(query, {
        next(row: string[], tableMeta: FluxTableMetaData) {
          const o = tableMeta.toObject(row);
          result.push(o);
        },
        error(error: Error) {
          console.error('Failed to query data from InfluxDB:', error.message);
          reject(`Failed to query data from InfluxDB: ${error.message}`);
        },
        complete() {
          console.log('Successfully queried data from InfluxDB');
          resolve(result);
        },
      });
    });
  }

  async getTotalEnergyConsumption(period: string, deviceReference: string) {
    const query = `from(bucket: "${process.env.INFLUXDB_BUCKET}") |> range(start: -${period}) |> filter(fn: (r) => r["device-reference"] == "${deviceReference}") |> sum()`;
    return this.queryData(query);
  }

  async getTotalEnergyAndCost(
    period: string,
    deviceReference: string,
    rate: number,
  ) {
    const totalEnergy = await this.getTotalEnergyConsumption(
      period,
      deviceReference,
    );
    const totalEnergyValue = totalEnergy[0]._value;
    const totalCost = totalEnergyValue * rate;

    return {
      totalEnergy: `${totalEnergyValue} kWh`,
      totalCost: `${totalCost} TND`,
    };
  }

  async compareDevices(period: string, deviceReferences: string[]) {
    const promises = deviceReferences.map((deviceReference) =>
      this.getTotalEnergyConsumption(period, deviceReference),
    );
    return Promise.all(promises);
  }

  async getPeakUsageTimes(period: string, deviceReference: string) {
    const query = `from(bucket: "${process.env.INFLUXDB_BUCKET}") |> range(start: -${period}) |> filter(fn: (r) => r["device-reference"] == "${deviceReference}") |> sort(columns: ["_value"], desc: true) |> limit(n: 1)`;
    return this.queryData(query);
  }
}

// import { Injectable } from '@nestjs/common';
// import { InfluxDB, Point } from '@influxdata/influxdb-client';
// import * as dotenv from 'dotenv';
// import { WebhookDto } from './dto/webhook.dto';
// import { ConsomationData } from './interface'; // Adjust the path as necessary

// @Injectable()
// export class InfluxyService {
//   private readonly client: InfluxDB;

//   constructor() {
//     dotenv.config();
//     this.client = new InfluxDB({
//       url: process.env.INFLUXDB_URL,
//       token: process.env.INFLUXDB_TOKEN,
//     });
//   }

//   async writePoint(point: Point) {
//     try {
//       const writeApi = this.client.getWriteApi(
//         process.env.INFLUXDB_ORG,
//         process.env.INFLUXDB_BUCKET,
//       );
//       console.log('About to write point to InfluxDB:', point);

//       writeApi.writePoint(point);
//       await writeApi.close();
//       console.log('Successfully wrote point to InfluxDB');
//     } catch (error) {
//       console.error('Failed to write point to InfluxDB:', error.message);
//       throw new Error(`Failed to write point to InfluxDB: ${error.message}`);
//     }
//   }
// }

// //   async getLatestData(
// //     deviceReference: string,
// //   ): Promise<ConsomationData | null> {
// //     const queryApi = this.client.getQueryApi(process.env.INFLUXDB_ORG);
// //     const fluxQuery = `from(bucket: "${process.env.INFLUXDB_BUCKET}") |> range(start: -1d) |> filter(fn: (r) => r["device-reference"] == "${deviceReference}") |> last()`;
// //     const result = await queryApi.collectRows(fluxQuery);
// //     return (result[0] as ConsomationData) || null;
// //   }

// //   async getHistoricalData(deviceReference: string, timePeriod: string) {
// //     const queryApi = this.client.getQueryApi(process.env.INFLUXDB_ORG);
// //     const fluxQuery = `from(bucket: "${process.env.INFLUXDB_BUCKET}") |> range(start: -${timePeriod}) |> filter(fn: (r) => r["device-reference"] == "${deviceReference}")`;
// //     const result = await queryApi.collectRows(fluxQuery);
// //     return result;
// //   }

// //   async getPeakUsageTimes(deviceReference: string) {
// //     const queryApi = this.client.getQueryApi(process.env.INFLUXDB_ORG);
// //     const fluxQuery = `from(bucket: "${process.env.INFLUXDB_BUCKET}") |> range(start: -1d) |> filter(fn: (r) => r["device-reference"] == "${deviceReference}") |> aggregateWindow(every: 1h, fn: mean, createEmpty: false)`;
// //     const result = await queryApi.collectRows(fluxQuery);
// //     return result;
// //   }
// //   async calculateCost(deviceReference: string, rate: number) {
// //     const latestData = await this.getLatestData(deviceReference);
// //     if (latestData && '_value' in latestData) {
// //       const powerUsage = latestData._value;
// //       const cost = powerUsage * rate;
// //       return { cost, rate };
// //     }
// //     return { cost: 0, rate };
// //   }
// //   async calculateHistoricalCost(
// //     deviceReference: string,
// //     timePeriod: string,
// //     rate: number,
// //   ) {
// //     const historicalData = await this.getHistoricalData(
// //       deviceReference,
// //       timePeriod,
// //     );
// //     const costs = historicalData.map((data: any) => {
// //       // Add type assertion here
// //       if ('_value' in data) {
// //         const powerUsage = data._value;
// //         const cost = powerUsage * rate;
// //         return { ...data, cost };
// //       }
// //       return { ...data, cost: 0 };
// //     });
// //     return costs;
// //   }
// //   async getEfficiencyTips(deviceReference: string) {
// //     // Logic to generate energy efficiency tips based on device usage data
// //     const latestData = await this.getLatestData(deviceReference);
// //     const tips = [];
// //     if (latestData && '_value' in latestData) {
// //       const usage = latestData._value;
// //       if (usage > 1000) {
// //         tips.push('Consider using energy-efficient appliances.');
// //       }
// //       if (usage > 500) {
// //         tips.push('Turn off lights when not in use.');
// //       }
// //     }
// //     return tips;
// //   }

// //   async getComparativeUsage(deviceReference: string) {
// //     const queryApi = this.client.getQueryApi(process.env.INFLUXDB_ORG);
// //     const fluxQuery = `
// //       from(bucket: "${process.env.INFLUXDB_BUCKET}")
// //       |> range(start: -1d)
// //       |> filter(fn: (r) => r["_field"] == "P")
// //       |> mean()
// //     `;
// //     const allData: { _value: number }[] = await queryApi.collectRows(fluxQuery);

// //     console.log('All data:', allData); // Debug log

// //     const deviceData: ConsomationData | null =
// //       await this.getLatestData(deviceReference);
// //     console.log('Device data:', deviceData); // Debug log

// //     if (allData.length === 0) {
// //       console.log('No comparative data found.');
// //       return {
// //         deviceUsage: deviceData ? deviceData._value : null,
// //         averageUsage: null,
// //       };
// //     }

// //     const validData = allData.filter((data) => typeof data._value === 'number');
// //     const averageUsage: number =
// //       validData.reduce(
// //         (sum: number, data: { _value: number }) => sum + data._value,
// //         0,
// //       ) / validData.length;

// //     console.log('Average usage:', averageUsage); // Debug log

// //     return {
// //       deviceUsage: deviceData ? deviceData._value : null,
// //       averageUsage,
// //     };
// //   }

// //   async getDeviceComparison(
// //     deviceReference1: string,
// //     deviceReference2: string,
// //     timePeriod: string,
// //   ) {
// //     const queryApi = this.client.getQueryApi(process.env.INFLUXDB_ORG);

// //     // Query for device 1
// //     const fluxQuery1 = `
// //     from(bucket: "${process.env.INFLUXDB_BUCKET}")
// //       |> range(start: -${timePeriod})
// //       |> filter(fn: (r) => r["_field"] == "P")
// //       |> filter(fn: (r) => r["device-reference"] == "${deviceReference1}")
// //       |> mean()
// //   `;
// //     console.log(fluxQuery1);

// //     const data1: { _value: number }[] = await queryApi.collectRows(fluxQuery1);

// //     // Query for device 2
// //     const fluxQuery2 = `
// //   from(bucket: "${process.env.INFLUXDB_BUCKET}")
// //     |> range(start: -${timePeriod})
// //     |> filter(fn: (r) => r["_field"] == "P")
// //     |> filter(fn: (r) => r["device-reference"] == "${deviceReference2}")
// //     |> mean()
// // `;
// //     console.log(fluxQuery2);
// //     const data2: { _value: number }[] = await queryApi.collectRows(fluxQuery2);

// //     if (data1.length === 0 || data2.length === 0) {
// //       console.log('No comparative data found.');
// //       return {
// //         device1Usage: data1.length > 0 ? data1[0]._value : null,
// //         device2Usage: data2.length > 0 ? data2[0]._value : null,
// //       };
// //     }

// //     return {
// //       device1Usage: data1[0]._value,
// //       device2Usage: data2[0]._value,
// //     };
// //   }
// // }
