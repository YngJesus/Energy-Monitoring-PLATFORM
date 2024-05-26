import { Box, Stat } from "@chakra-ui/react";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import Chart from "chart.js/auto"; // Import Chart.js
import { GlobalContext } from "../../../context/GlobalWrapper";

const GenderStat = () => {
  const { GenderChart, GenderData } = useContext(GlobalContext);

  useEffect(() => {
    GenderChart();
  }, []);

  const chartData = {
    labels: GenderData.map((item) => item._id), // Assuming "gender" property in userData
    datasets: [
      {
        label: "User Genders",
        data: GenderData.map((item) => item.count), // Assuming "count" property in userData
        backgroundColor: ["rgba(75, 192, 192, 0.2)", "rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  // Modify Chart.js defaults to ensure "category" scale is available
  Chart.defaults.scale.category = true;

  // Calculate the total count
  const totalCount = GenderData.reduce((total, item) => total + item.count, 0);

  return (
    <Box boxSize={300} mt={5}>
      {/* <h2>User Genders</h2> */}
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

export default GenderStat;

// import { Box } from "@chakra-ui/react";
// import { Doughnut } from "react-chartjs-2";
// import axios from "axios";
// import { useState, useEffect } from "react";

// const GenderStat = () => {

//   useEffect(() => {
//     axios
//       .get("http://localhost:3000/users/gender-stat")
//       .then((response) => {
//         setGenderData(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });
//   }, []);

//   const chartData = {
//     labels: genderData.map((item) => item._id),
//     datasets: [
//       {
//         label: "Gender Distribution",
//         data: genderData.map((item) => item.count),
//         backgroundColor: ["rgba(255, 99, 132, 0.6)", "rgba(54, 162, 235, 0.6)"], // Define colors for the segments
//         borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"], // Define border colors for the segments
//         borderWidth: 1,
//       },
//     ],
//   };

//   return (
//     <Box>
//       <h2>Gender Distribution</h2>
//       <Doughnut data={chartData} />
//     </Box>
//   );
// };

// export default GenderChart;
