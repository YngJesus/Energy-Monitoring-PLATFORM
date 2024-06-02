import React, { useContext, useEffect } from "react";
import {
  Box,
  Text,
  Divider,
  VStack,
  useColorModeValue,
  Icon,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Stat,
  StatLabel,
  StatNumber,
  List,
  ListItem,
  HStack,
} from "@chakra-ui/react";
import { GlobalContext } from "../../context/GlobalWrapper";
import { EmailIcon, PhoneIcon, InfoOutlineIcon } from "@chakra-ui/icons";
import { FaMale, FaFemale, FaPlug } from "react-icons/fa";
import styles from "../../styles/LoginPage.module.css";
import AdminTotalEnergyChart from "../utils/Admin/AdminTotalEnergyChart";
import AdminCostChart from "../utils/Admin/AdminCostChart";
import AdminPeakUsage from "../utils/Admin/AdminPeak";

function OneUser({ userId }) {
  const { user, FindOne } = useContext(GlobalContext);

  const memoizedFindOne = React.useMemo(() => {
    const cache = {};
    return (userId) => {
      if (cache[userId]) {
        return cache[userId];
      }
      const result = FindOne(userId);
      cache[userId] = result;
      return result;
    };
  }, []);

  useEffect(() => {
    console.log("OneUser userId:", userId);
    const user = memoizedFindOne(userId);
    // Use the retrieved user data here
  }, [userId, memoizedFindOne]);

  const cardBg = useColorModeValue("white", "purple.900");
  const cardBorder = useColorModeValue("#6366F1", "teal.700");

  const genderIcon = user?.Gender === "male" ? FaMale : FaFemale;

  return (
    <Tabs variant="soft-rounded" colorScheme="purple">
      <TabList>
        <Tab>Personal Info & Linked Devices</Tab>
        <Tab>Total Energy Chart</Tab>
        <Tab>Cost Chart</Tab>
        <Tab>Peak Usage</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <HStack>
            <Box
              p={5}
              bg={cardBg}
              borderWidth="1px"
              borderColor={cardBorder}
              borderRadius="lg"
              shadow="md"
              maxW="sm"
              mx={2}
              my={6}
              className={styles.login}
            >
              <Text fontSize="lg" color={"#6366F1"} fontWeight="bold" mb={4}>
                <Icon as={InfoOutlineIcon} mr={2} />
                User Information:
              </Text>
              <Divider mb={4} />
              <VStack spacing={4} align="stretch">
                <Text fontSize="md">
                  <Box mr={2} as="span" color={"#6366F1"}>
                    <Icon as={EmailIcon} mr={2} />
                    FirstName:
                  </Box>
                  {user?.firstName}
                </Text>
                <Text fontSize="md">
                  <Box mr={2} as="span" color={"#6366F1"}>
                    <Icon as={PhoneIcon} mr={2} />
                    LastName:
                  </Box>
                  {user?.lastName}
                </Text>
                <Text fontSize="md">
                  <Box mr={2} as="span" color={"#6366F1"}>
                    <Icon as={EmailIcon} mr={2} />
                    Email:
                  </Box>
                  {user?.Email}
                </Text>
                <Text fontSize="md">
                  <Box mr={2} as="span" color={"#6366F1"}>
                    <Icon as={genderIcon} mr={2} />
                    Gender:
                  </Box>
                  {user?.Gender}
                </Text>
                <Text fontSize="md">
                  <Box mr={2} as="span" color={"#6366F1"}>
                    <Icon as={PhoneIcon} mr={2} />
                    Number:
                  </Box>
                  {user?.Number}
                </Text>
              </VStack>
            </Box>
            <Stat
              display={"inline-block"}
              p={1}
              pl={5}
              pr={5}
              border={"solid 1px #6366F1"}
              rounded={30}
              bgColor={"white"}
            >
              <StatLabel
                fontWeight={700}
                textAlign={"center"}
                py={1}
                fontSize={"xl"}
                color={"#6366F1"}
              >
                Your Devices
              </StatLabel>
              <Divider borderColor={"#6366F1"} orientation="horizontal" m={2} />
              <StatNumber ml={6} fontSize={"lg"}>
                <List spacing={1} mt={1}>
                  {user.linkedDevice && user.linkedDevice.length > 0 ? (
                    user.linkedDevice.map((device, index) => (
                      <ListItem key={index} p={2} borderRadius="md">
                        <HStack spacing={2} p={2} rounded={50} bg={"gray.100"}>
                          <Icon as={FaPlug} color="#6366F1" />
                          <Text fontWeight="medium">Ref: {device}</Text>
                        </HStack>
                      </ListItem>
                    ))
                  ) : (
                    <Text color="gray.500">No linked devices found.</Text>
                  )}
                </List>{" "}
              </StatNumber>
            </Stat>
          </HStack>
        </TabPanel>

        <TabPanel>
          {user && user.linkedDevice && user.linkedDevice.length > 0 ? (
            <AdminTotalEnergyChart linkedDevice={user?.linkedDevice} />
          ) : (
            <Text>No data available for Total Energy Chart.</Text>
          )}
        </TabPanel>

        <TabPanel>
          {user && user.linkedDevice && user.linkedDevice.length > 0 ? (
            <AdminCostChart linkedDevice={user?.linkedDevice} />
          ) : (
            <Text>No data available for Cost Chart.</Text>
          )}
        </TabPanel>

        <TabPanel>
          {user && user.linkedDevice && user.linkedDevice.length > 0 ? (
            <AdminPeakUsage linkedDevice={user?.linkedDevice} />
          ) : (
            <Text>No data available for Peak Usage.</Text>
          )}
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default OneUser;
