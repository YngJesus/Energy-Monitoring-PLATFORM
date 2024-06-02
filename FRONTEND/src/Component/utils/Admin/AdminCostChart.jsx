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
import { Line } from "react-chartjs-2";

const AdminEnergyCostChart = ({ linkedDevice }) => {
  const [energyCostData, setEnergyCostData] = useState({});
  const [totalCost, setTotalCost] = useState(0);
  const [error, setError] = useState(null);
  const [period, setPeriod] = useState("7d");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const promises = linkedDevice.map(async (deviceReference) => {
          const response = await axios.get(
            `http://localhost:3000/influxdb-devices/total-energy-and-cost?period=${period}&deviceReference=${deviceReference}`
          );
          return response.data.data;
        });

        const energyCostDataArray = await Promise.all(promises);

        // Combine data for each device
        const combinedData = {};
        let totalCostSum = 0;
        energyCostDataArray.forEach((data, index) => {
          combinedData[linkedDevice[index]] = data;
          totalCostSum += parseFloat(data.totalCost.replace(" TND", ""));
        });

        setEnergyCostData(combinedData);
        setTotalCost(totalCostSum);
        localStorage.setItem("totalCost", totalCostSum.toFixed(2));
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, [period]);

  const handlePeriodChange = (event) => {
    setPeriod(event.target.value);
  };

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  if (Object.keys(energyCostData).length === 0) {
    return <Text>Loading...</Text>;
  }

  return (
    <Center>
      <Box w="70%" p="4" bg="gray.100" borderRadius="lg" boxShadow="lg">
        {" "}
        {/* Change the background color to match the sidebar */}
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
                <Box mb="4" p="4" bg="white" borderRadius="md" boxShadow="md">
                  <Text fontSize="lg" fontWeight="bold">
                    Total Cost: {totalCost.toFixed(2)} TND
                  </Text>
                </Box>
                <Box mb="4" p="4" bg="white" borderRadius="md" boxShadow="md">
                  <Text fontSize="lg" fontWeight="bold">
                    Device Cost:{" "}
                    {parseFloat(
                      energyCostData[deviceReference].totalCost.replace(
                        " TND",
                        ""
                      )
                    ).toFixed(2)}{" "}
                    TND
                  </Text>
                </Box>
                <LineChart data={energyCostData[deviceReference]} />
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </Box>
    </Center>
  );
};

const LineChart = ({ data }) => {
  const labels = Object.keys(data);
  const values = Object.values(data).map((value) =>
    parseFloat(value.replace(" TND", ""))
  );

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Total Energy Cost (TND)",
        data: values,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        fill: true,
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: "kWh",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Price",
        },
      },
    },
  };

  return <Line data={chartData} options={chartOptions} />;
};

export default AdminEnergyCostChart;
