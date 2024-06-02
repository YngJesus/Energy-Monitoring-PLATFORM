import React, { useEffect, useState } from "react";
import { Box, Center, Text, Heading, Divider } from "@chakra-ui/react";
import axios from "axios";
import { Line } from "react-chartjs-2";

const labelMapping = {
  P: "Active Power (P) W",
  Q: "Reactive Power (Q) VAR",
  S: "Apparent Power (S) VA",
  cosphi: "Power Factor",
};

const CompareDevicesChart = () => {
  const [comparisonData, setComparisonData] = useState([]);
  const [error, setError] = useState(null);
  const linkedDevices = JSON.parse(localStorage.getItem("linkedDevice"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/influxdb-devices/compare-devices?deviceReferences=${linkedDevices.join(
            "&deviceReferences="
          )}`
        );
        setComparisonData(response.data.data);
      } catch (error) {
        setError(error);
      }
    };

    if (linkedDevices && linkedDevices.length > 0) {
      fetchData();
    }
  }, []); // Run this effect only once when the component mounts

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  if (comparisonData.length === 0) {
    return <Text>Loading...</Text>;
  }

  return (
    <Center>
      <Box w="80%" p="4" bg="gray.100" borderRadius="lg" boxShadow="lg">
        <Heading textAlign={"center"}>Devices Comparison</Heading>
        <Divider orientation="horizontal" my={2} borderColor={"black"} />

        <LineChart data={comparisonData} linkedDevices={linkedDevices} />
      </Box>
    </Center>
  );
};

const LineChart = ({ data, linkedDevices }) => {
  const colors = ["rgba(75, 192, 192, 1)", "rgba(153, 102, 255, 1)"];
  const backgroundColors = [
    "rgba(75, 192, 192, 0.2)",
    "rgba(153, 102, 255, 0.2)",
  ];

  const datasets = linkedDevices.map((deviceReference, index) => {
    const deviceData = data[index];
    const labels = deviceData.map(
      (entry) => labelMapping[entry._field] || entry._field
    );
    const values = deviceData.map((entry) => entry._value);

    return {
      label: `Device ${deviceReference}`,
      data: values,
      borderColor: colors[index % colors.length],
      backgroundColor: backgroundColors[index % backgroundColors.length],
      fill: false,
      tension: 0.1,
    };
  });

  const chartData = {
    labels: data[0].map((entry) => labelMapping[entry._field] || entry._field), // Assuming all devices have the same labels
    datasets: datasets,
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Values",
        },
      },
    },
  };

  return <Line data={chartData} options={chartOptions} />;
};

export default CompareDevicesChart;
