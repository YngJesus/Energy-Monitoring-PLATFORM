import React from "react";
import Header from "./parts/Header";
import Hero from "./parts/Hero";
import Services from "./parts/Services";
import AboutUs from "./parts/AboutUs";
import Footer from "./parts/Footer";
import { Box } from "@chakra-ui/react";

function HomeInerface() {
  return (
    <Box maxW={"1330px"}>
      <Header />
      <Hero />
      <Services />
      <AboutUs />
      <Footer />
    </Box>
  );
}

export default HomeInerface;
