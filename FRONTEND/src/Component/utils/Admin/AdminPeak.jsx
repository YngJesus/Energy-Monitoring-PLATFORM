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

const AdminPeakUsage = ({ linkedDevice }) => {
  const [peakUsageData, setPeakUsageData] = useState([]);
  const [error, setError] = useState(null);
  const [period, setPeriod] = useState("7d");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const promises = linkedDevice.map(async (deviceReference) => {
          const response = await axios.get(
            `http://localhost:3000/influxdb-devices/peak-usage-times?period=${period}&deviceReference=${deviceReference}`
          );
          return response.data.data;
        });

        const peakUsageDataArray = await Promise.all(promises);

        // Combine data for each device
        const combinedData = {};
        peakUsageDataArray.forEach((data, index) => {
          combinedData[linkedDevice[index]] = data;
        });

        setPeakUsageData(combinedData);
        localStorage.setItem("combinedData", combinedData);
        localStorage.setItem("PeakData", JSON.stringify(combinedData));
        console.log(combinedData);
      } catch (error) {
        setError(error);
      }
    };

    // Fetch data only when period changes
    fetchData();
  }, [period]); // Fetch data only when period changes

  const handlePeriodChange = (event) => {
    setPeriod(event.target.value);
  };

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  if (Object.keys(peakUsageData).length === 0) {
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
                <PeakUsageChart data={peakUsageData[deviceReference]} />
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </Box>
    </Center>
  );
};

const PeakUsageChart = ({ data }) => {
  const labels = data.map((entry) => {
    let label = "";
    switch (entry._field) {
      case "P":
        label = "Active Power (P) W";
        break;
      case "S":
        label = "Apparent Power (S) VA";
        break;
      case "Q":
        label = "Reactive Power (Q) VAR";
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
        label: "Peak Usage",
        data: values,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Peak Usage",
          },
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return <Bar data={chartData} options={chartOptions} />;
};

export default AdminPeakUsage;
