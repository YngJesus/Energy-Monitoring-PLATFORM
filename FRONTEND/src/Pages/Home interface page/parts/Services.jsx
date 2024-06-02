import React from "react";
import {
  Box,
  Heading,
  Text,
  Flex,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaBolt, FaDollarSign, FaChartLine, FaClock } from "react-icons/fa";

const ServiceCard = ({ title, text, icon }) => {
  const bg = useColorModeValue("white", "gray.800");
  return (
    <Box
      border={"solid 2px black"}
      p={"35px"}
      shadow="md"
      borderWidth="1px"
      borderRadius="lg"
      bg={bg}
      textAlign="center"
      m={8}
      width={["100%", "45%", "45%", "22%"]}
    >
      <Icon as={icon} w={10} h={10} mb={4} />
      <Heading size="md" mb={4}>
        {title}
      </Heading>
      <Text>{text}</Text>
    </Box>
  );
};

const Services = () => {
  return (
    <Box bg="gray.100" p={8}>
      <Heading mb={8} textAlign="center">
        Our Services
      </Heading>
      <Text mb={"3rem"} mt={"3rem"} textAlign="center">
        At EnergiWave, we are committed to empowering our clients with the tools
        and knowledge to manage their energy consumption effectively. Our suite
        of services is designed to provide comprehensive solutions for energy
        monitoring, cost management, and usage optimization. By leveraging
        advanced technology and personalized insights, we help you take control
        of your energy usage, reduce environmental impact, and achieve
        sustainable savings.
      </Text>

      <Flex justifyContent="center" flexWrap="wrap">
        <ServiceCard
          title="Real-time Energy Monitoring"
          text="Track your energy usage in real-time and gain insights into your consumption patterns."
          icon={FaBolt}
        />
        <ServiceCard
          title="Consumption Cost"
          text="Monitor your energy consumption costs and identify areas for potential savings."
          icon={FaDollarSign}
        />
        <ServiceCard
          title="Devices Consumption Comparison"
          text="Compare consumption of different devices to make informed purchasing decisions."
          icon={FaChartLine}
        />
        <ServiceCard
          title="Peak Usage Optimization"
          text="Optimize energy usage during peak hours to minimize costs and maximize efficiency."
          icon={FaClock}
        />
      </Flex>
    </Box>
  );
};

export default Services;
