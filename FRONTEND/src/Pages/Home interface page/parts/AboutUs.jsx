import React from "react";
import { Box, Heading, Text, Flex, Image, Divider } from "@chakra-ui/react";

const AboutUs = () => {
  return (
    <Box
      bgImage="/img/about.jpg"
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
      py={150}
      textAlign={"center"}
      color={"white"}
    >
      <Flex>
        <Box flex="1">
          <Heading size="2xl" mb={8}>
            About Us
          </Heading>
          <Divider m={5} />
          <Text fontSize="xl">
            EnergiWave stands out as a trailblazer in the realm of energy
            monitoring solutions, spearheading efforts to revolutionize how
            individuals and businesses interact with and manage their energy
            consumption. At the heart of our mission lies a deep commitment to
            empowering our customers with the knowledge and tools necessary to
            take control of their energy usage. By providing comprehensive
            insights and real-time data, we enable our clients to make informed
            decisions that not only benefit their bottom line but also
            contribute to a larger, more sustainable vision for the future.
            Through innovative technology and unparalleled expertise, EnergiWave
            is driving positive change and paving the way towards a greener,
            more efficient world.
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default AboutUs;
