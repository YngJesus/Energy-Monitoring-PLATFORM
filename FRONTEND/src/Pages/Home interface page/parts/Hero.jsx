// components/Hero.js
import React from "react";
import { Box, Heading, Text, Flex } from "@chakra-ui/react";

const Hero = () => {
  return (
    <Box
      bgImage="url('/img/Hero.jpg')"
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
      color="white"
      textAlign="center"
      py={190}
    >
      <Heading size="2xl" mb={4}>
        Empowering Your Energy Efficiency
      </Heading>
      <Text fontSize="xl" mb={8}>
        Discover your energy efficiency and empower sustainable practices.
      </Text>
      <Flex justifyContent="center">
        <Box textAlign="center" mr={8}>
          <Heading size="lg" mb={2}>
            1000+
          </Heading>
          <Text>Users</Text>
        </Box>
        <Box textAlign="center" mr={8}>
          <Heading size="lg" mb={2}>
            10,000+
          </Heading>
          <Text>Devices Monitored</Text>
        </Box>
        <Box textAlign="center">
          <Heading size="lg" mb={2}>
            500+
          </Heading>
          <Text>Energy Reports Generated</Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default Hero;
