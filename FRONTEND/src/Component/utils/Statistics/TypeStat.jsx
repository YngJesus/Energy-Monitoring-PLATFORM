import { Box, Stat } from "@chakra-ui/react";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import Chart from "chart.js/auto"; // Import Chart.js
import { GlobalContext } from "../../../context/GlobalWrapper";

const TypeStat = () => {
  const { TypeChart, deviceData } = useContext(GlobalContext);

  useEffect(() => {
    TypeChart();
  }, []);

  const chartData = {
    labels: deviceData.map((item) => item._id),
    datasets: [
      {
        label: "Device Types",
        data: deviceData.map((item) => item.count),
        backgroundColor: ["rgba(75, 192, 192, 0.2)", "rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  // Modify Chart.js defaults to ensure "category" scale is available
  Chart.defaults.scale.category = true;

  // Calculate the total count
  const totalCount = deviceData.reduce((total, item) => total + item.count, 0);

  return (
    <Box boxSize={300} mt={5}>
      {/* <h2>Device Types</h2> */}
      <Stat rounded={30}>
        <Doughnut
          data={chartData}
          options={{
            elements: {
              center: {
                text: `${totalCount}%`,
                color: "#000000", // Default is #000000
                fontStyle: "Arial", // Default is Arial
                sidePadding: 20, // Default is 20 (as a percentage)
              },
            },
          }}
        />
      </Stat>
    </Box>
  );
};

export default TypeStat;
