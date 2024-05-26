import React, { useEffect } from "react"; // Import useEffect
import { Grid, GridItem } from "@chakra-ui/react";
import SideBarUser from "../../Component/Dashboard/user/SideBarUser";
import UserNavbar from "../../Component/Dashboard/user/UserNavbar";
import { useNavigate } from "react-router-dom";
import TotalEnergyCostChart from "../../Component/utils/UserCharts/EnergyCostChart";

function EnergyCost() {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole");
  console.log(userRole);

  useEffect(() => {
    if (userRole !== "user") {
      navigate("/User-login");
      alert("You need to login first");
    }
  }, [userRole, navigate]);

  if (userRole === "user") {
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
            <UserNavbar />
          </GridItem>
          <GridItem pl="2" bg="#171717" area={"nav"} boxShadow={"xl"}>
            <SideBarUser />
          </GridItem>
          <GridItem pl="2" bg="white" area={"main"}>
            <TotalEnergyCostChart />
          </GridItem>
        </Grid>
      </>
    );
  } else {
    return null;
  }
}

export default EnergyCost;
