import React from "react";
import Signup from "../auth/Signup";
import { Grid, GridItem } from "@chakra-ui/react";
import DashNavbar from "../../Component/Dashboard/Dash-Navbar";
import SideBar from "../../Component/Dashboard/sideBar";

function AddAdmin() {
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
        >
          <GridItem pl="2" bg="white.300" area={"header"}>
            <DashNavbar />
          </GridItem>
          <GridItem pl="2" bg="#1C2536" area={"nav"} boxShadow={"xl"}>
            <SideBar />
          </GridItem>
          <GridItem pl="2" bg="white" area={"main"}>
            <Signup />
          </GridItem>
        </Grid>
      </>
    );
  } else {
    return <AdminAccess />;
  }
}

export default AddAdmin;
