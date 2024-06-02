import { Grid, GridItem } from "@chakra-ui/react";
import React, { useContext } from "react";
import DashNavbar from "../../Component/Dashboard/Dash-Navbar";
import SideBar from "../../Component/Dashboard/sideBar";
import AdminAccess from "../../Component/AdminAccess";
import MainOverview from "../../Component/Dashboard/MainOverview";

function Overview() {
  const userRole = localStorage.getItem("userRole"); // Retrieve userRole from localStorage

  if (userRole === "admin") {
    return (
      <>
        <Grid
          templateAreas={`"nav header"
                "nav main"
                `}
          gridTemplateRows={" 70px 1fr "}
          gridTemplateColumns={"270px 1fr"}
          h="100vh"
          gap="1"
          color="blackAlpha.700"
          fontWeight="bold"
          fontSize={"18px"}
          maxW={"1400px"}
        >
          <GridItem pl="2" bg="white.300" area={"header"}>
            <DashNavbar />
          </GridItem>
          <GridItem pl="2" bg="#1C2536" area={"nav"} boxShadow={"xl"}>
            <SideBar />
          </GridItem>
          <GridItem pl="2" bg="white" area={"main"}>
            <MainOverview />
          </GridItem>
        </Grid>
      </>
    );
  } else {
    return <AdminAccess />;
  }
}

export default Overview;
