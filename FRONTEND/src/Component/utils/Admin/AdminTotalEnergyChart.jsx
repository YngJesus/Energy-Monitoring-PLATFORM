import React, { useEffect, useState } from "react";
import {
  Box,
  Center,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Select,
} from "@chakra-ui/react";
import axios from "axios";
import { Bar } from "react-chartjs-2";

const AdminTotalEnergyChart = ({ linkedDevice }) => {
  const [energyData, setEnergyData] = useState({});
  const [error, setError] = useState(null);
  const [period, setPeriod] = useState("7d");
  console.log(linkedDevice);

  useEffect(() => {
    console.log("Fetching data...");

    const fetchData = async () => {
      try {
        const promises = linkedDevice.map(async (deviceReference) => {
          const response = await axios.get(
            `http://localhost:3000/influxdb-devices/total-energy?period=${period}&deviceReference=${deviceReference}`
          );
          // console.log(response.data.data);
          return response.data.data;
        });

        const energyDataArray = await Promise.all(promises);

        // Combine data for each device
        const combinedData = {};
        energyDataArray.forEach((data, index) => {
          combinedData[linkedDevice[index]] = data;
        });

        setEnergyData(combinedData);
        localStorage.setItem("combinedData", combinedData);
        localStorage.setItem("energyData", JSON.stringify(combinedData));
        console.log(combinedData);
      } catch (error) {
        setError(error);
      }
    };

    fetchData(); // Fetch data when component mounts

    return () => {
      console.log("Cleanup");
    };
  }, [period]); // Fetch data only when period changes

  const handlePeriodChange = (event) => {
    setPeriod(event.target.value);
  };

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  if (Object.keys(energyData).length === 0) {
    return <Text>Loading...</Text>;
  }

  return (
    <Center>
      <Box w="80%" p="4" bg="gray.100" borderRadius="lg" boxShadow="lg">
        <Select value={period} onChange={handlePeriodChange} mb="4">
          <option value="7d">Last 7 Days</option>
          <option value="1mo">Last Month</option>
        </Select>
        <Tabs variant="enclosed">
          <TabList>
            {linkedDevice.map((deviceReference) => (
              <Tab key={deviceReference}>{deviceReference}</Tab>
            ))}
          </TabList>
          <TabPanels>
            {linkedDevice.map((deviceReference) => (
              <TabPanel key={deviceReference}>
                <BarChart data={energyData[deviceReference]} />
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </Box>
    </Center>
  );
};

const BarChart = ({ data }) => {
  const labels = data.map((entry) => {
    let label = "";
    switch (entry._field) {
      case "P":
        label = "Active Power (P)";
        break;
      case "S":
        label = "Apparent Power (S)";
        break;
      case "Q":
        label = "Reactive Power (Q)";
        break;
      default:
        label = entry._field;
        break;
    }
    return label;
  });
  const values = data.map((entry) => entry._value);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Energy (W, VA, VAR)",
        data: values,
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        scaleLabel: {
          display: true,
          labelString: "Energy",
        },
        ticks: {
          beginAtZero: true,
          callback: function (value) {
            if (Number.isInteger(value)) {
              return value;
            }
          },
        },
      },
    },
  };

  return <Bar data={chartData} options={chartOptions} />;
};

export default AdminTotalEnergyChart;
