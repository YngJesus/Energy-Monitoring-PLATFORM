const axios = require("axios");

// Function to generate realistic random data for a device
const generateData = (reference) => {
  // Typical household voltage ranges from 220V to 240V
  const Vrms = Math.random() * (240 - 220) + 220;

  // Simulate different types of household appliances with adjusted power consumption and usage probabilities
  const appliances = [
    { name: "Light Bulb", power: 1, usageProbability: 0.9 }, // 100W bulb, used 90% of the time
    { name: "Television", power: 1.5, usageProbability: 0.7 }, // 150W TV, used 70% of the time
    { name: "Refrigerator", power: 2, usageProbability: 1.0 }, // 200W fridge, used all the time
    { name: "Microwave Oven", power: 3.5, usageProbability: 0.2 }, // 1500W microwave, used 20% of the time
    { name: "Air Conditioner", power: 3, usageProbability: 0.5 }, // 2000W AC, used 50% of the time
    { name: "Washing Machine", power: 1.8, usageProbability: 0.3 }, // 800W washing machine, used 30% of the time
    { name: "Dishwasher", power: 3.5, usageProbability: 0.3 }, // 1500W dishwasher, used 10% of the time
    { name: "Desktop Computer", power: 1.5, usageProbability: 0.4 }, // 500W computer, used 40% of the time
  ];

  // Choose a random appliance from the list
  const randomAppliance =
    appliances[Math.floor(Math.random() * appliances.length)];

  // Simulate usage probability
  const isDeviceOn = Math.random() < randomAppliance.usageProbability;

  // Calculate current consumption based on the chosen appliance's power
  const Irms = isDeviceOn ? randomAppliance.power / Vrms : 0;

  // Mean current can vary slightly around Irms, but not significantly
  const Imean = Irms * (Math.random() * 0.1 + 0.95);

  // Voltage may slightly vary around Vrms, but not significantly
  const V = Vrms + (Math.random() * 2 - 1) * 2; // Adjusted voltage variation

  return {
    deviceReference: reference,
    Vrms,
    Irms,
    Imean,
    V,
  };
};

// Function to send data to Nest.js backend for a given device
const sendData = async (data) => {
  try {
    await axios.post("http://localhost:3000/influxdb-devices", data);
    console.log(
      `Data sent to Nest.js backend: ${data.deviceReference} - ${data.Vrms} - ${data.Irms} - ${data.Imean} - ${data.V}`
    );
  } catch (error) {
    console.error("Error sending data:", error.message);
  }
};

// Function to send data for both devices
const sendBothDevicesData = async () => {
  const data1 = generateData("SS0H");
  const data2 = generateData("BT1K");

  console.log("Generated Data for SS0H:", data1);
  console.log("Generated Data for BT1K:", data2);

  await Promise.all([sendData(data1), sendData(data2)]);
};

// Send data every hour for two months (approximately 60 days)
// Send data every minute for testing
setInterval(sendBothDevicesData, 100); // 60000 milliseconds = 1 minute
