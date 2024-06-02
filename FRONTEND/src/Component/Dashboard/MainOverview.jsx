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
  return (
    <Box>
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
