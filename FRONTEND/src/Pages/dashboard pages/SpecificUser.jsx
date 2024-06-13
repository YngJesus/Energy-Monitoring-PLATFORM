import { Grid, GridItem } from "@chakra-ui/react";
import React from "react";
import DashNavbar from "../../Component/Dashboard/Dash-Navbar";
import SideBar from "../../Component/Dashboard/sideBar";
import AdminAccess from "../../Component/AdminAccess";
import OneUser from "../../Component/Dashboard/OneUser";
import { useParams } from "react-router-dom"; // Import useParams

function SpecificUser() {
  const { id } = useParams(); // Get the user ID from the URL

  // You can use the 'id' to fetch user data or perform other actions
  const userRole = localStorage.getItem("userRole"); // Retrieve userRole from localStorage

  if (userRole === "admin") {
    return (
      <>
        <Grid
          templateAreas={`"nav header"
                  "nav main"
                  `}
          gridTemplateRows={" 70px 1fr "}
          gridTemplateColumns={"270px 1fr "}
          h="100vh"
          gap="1"
          color="blackAlpha.700"
          fontWeight="bold"
          fontSize={"18px"}
          // maxW={"1200px"}
        >
          <GridItem pl="2" bg="white.300" area={"header"}>
            <DashNavbar />
          </GridItem>
          <GridItem pl="2" bg="#1C2536" area={"nav"} boxShadow={"xl"}>
            <SideBar />
          </GridItem>
          <GridItem pl="2" bg="white" area={"main"}>
            {/* Pass the 'id' to the OneUser component */}
            <OneUser userId={id} />
          </GridItem>
        </Grid>
      </>
    );
  } else {
    return <AdminAccess />;
  }
}

export default SpecificUser;
