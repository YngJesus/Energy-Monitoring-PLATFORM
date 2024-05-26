import React, { useContext, useEffect } from "react";
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Text,
  VStack,
  HStack,
  Avatar,
  Heading,
  Box,
} from "@chakra-ui/react";

import UsersStat from "../utils/Statistics/UsersStat";
import DevicesStat from "../utils/Statistics/DevicesStat";

function MainOverview() {
  const firstName = localStorage.getItem("firstName");

  return (
    <Box>
      <VStack spacing={5} align="start">
        <HStack>
          <Heading>Welcome, {firstName}!</Heading>
        </HStack>
        <Text fontSize="xl">
          Here's an overview of your Users and Devices Statistics:
        </Text>
      </VStack>
      <Tabs pt={15} size={"lg"} variant="soft-rounded" colorScheme="green">
        <TabList pb={5}>
          <Tab>Users statistics</Tab>
          <Tab>Devices statistics</Tab>
        </TabList>
        <TabPanels>
          <TabPanel mt={0}>
            <UsersStat />
          </TabPanel>
          <TabPanel>
            <DevicesStat />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default MainOverview;
