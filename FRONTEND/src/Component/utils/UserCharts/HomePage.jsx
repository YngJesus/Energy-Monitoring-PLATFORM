import React from "react";
import {
  Box,
  Text,
  Heading,
  VStack,
  HStack,
  Avatar,
  List,
  ListItem,
  Icon,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Stat,
  StatLabel,
  StatNumber,
  Img,
  Spacer,
  Flex,
  Divider,
} from "@chakra-ui/react";
import { FaPlug } from "react-icons/fa";

const HomePage = () => {
  // Fetch user's name, total cost, and linked devices from localStorage
  const firstName = localStorage.getItem("firstName");
  const totalCost = localStorage.getItem("totalCost");
  const storedData = localStorage.getItem("energyData");
  const parsedData = storedData ? JSON.parse(storedData) : {};
  const StoredPeak = localStorage.getItem("PeakData");
  const PerakData = StoredPeak ? JSON.parse(StoredPeak) : {};
  console.log(PerakData);
  const linkedDevices = JSON.parse(localStorage.getItem("linkedDevice"));

  // Flatten the object of arrays
  const flattenedData = Object.values(parsedData).flatMap((array) => array);

  // Prepare data for the table
  const tableData = {};
  flattenedData.forEach((data) => {
    const device = data["device-reference"];
    const field = data["_field"];
    const value = parseFloat(data["_value"]).toFixed(2);
    if (!tableData[device]) {
      tableData[device] = { P: "", S: "", Q: "", cosPhi: "" };
    }
    tableData[device][field] = value;
  });

  return (
    <Box
      // p={3}
      p="1em"
      // bg="blue.50"
      // mx="auto"
      // m={"0.1em"}
      // border="1px"
      // borderColor="gray.300"
      // borderRadius="md"
    >
      {/* Welcome Header */}
      {/* <VStack spacing={5} align="center">
        <HStack spacing={3}>
          <Avatar name={firstName} />
          <Heading color="teal.400">Welcome, {firstName}!</Heading>
        </HStack>
        <Text fontSize="xl" color="gray.600">
          Here's an overview of your energy usage:
        </Text>
      </VStack> */}

      {/* Linked Devices Section */}
      <HStack mb={2}>
        <Stat
          display={"inline-block"}
          p={1}
          pl={5}
          pr={5}
          border={"solid 1px Black"}
          rounded={30}
          bgColor={"white"}
        >
          <StatLabel
            fontWeight={700}
            textAlign={"center"}
            py={1}
            fontSize={"xl"}
          >
            Your Devices
          </StatLabel>
          <Divider borderColor={"Black"} orientation="horizontal" m={2} />
          <StatNumber ml={6} fontSize={"lg"}>
            <List spacing={1} mt={1}>
              {linkedDevices && linkedDevices.length > 0 ? (
                linkedDevices.map((device, index) => (
                  <ListItem key={index} p={2} borderRadius="md">
                    <HStack spacing={2} p={2} rounded={50} bg={"gray.100"}>
                      <Icon as={FaPlug} color="black" />
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
        {/* Total Cost */}

        <Stat
          display={"inline-block"}
          p={1}
          pl={5}
          pr={5}
          border={"solid 1px Black"}
          rounded={30}
          bg={"white"}
        >
          <Flex justify="space-between" align="center" p={5} bg={"white"}>
            <VStack align="flex-start">
              <Text py={2} fontWeight="bold" fontSize="xl">
                TOTAL COST:
              </Text>
              <Text fontWeight="bold" fontSize="3xl">
                {totalCost ? `${parseFloat(totalCost).toFixed(2)}  TND` : "N/A"}
              </Text>
              <Text color="green.500"> THIS MONTH</Text>
            </VStack>
            <Box>
              <Img src="\img\TNDLogo.png" boxSize="120px" />
            </Box>
          </Flex>
        </Stat>
      </HStack>
      {/* Energy Data Table */}
      <Stat pt={5} border={"solid 1px Black"} bg={"white"} rounded={30} px={4}>
        <Box overflowX="auto">
          <Heading textAlign={"center"} size="md" mb={3}>
            Total Energy Data
          </Heading>
          <Divider borderColor={"Black"} orientation="horizontal" my={2} />

          <Table variant="striped" colorScheme="teal">
            <Thead bg="teal.50">
              <Tr>
                <Th>Device</Th>
                <Th>Active Power (watt)</Th>
                <Th>Apparent Power (volt-ampere)</Th>
                <Th>Reactive Power (volt-ampere reactive)</Th>
                <Th>Power Factor</Th>
              </Tr>
            </Thead>
            <Tbody>
              {Object.keys(tableData).map((device, index) => (
                <Tr key={index}>
                  <Td>{device}</Td>
                  <Td>{tableData[device].P} W</Td>
                  <Td>{tableData[device].S} VA</Td>
                  <Td>{tableData[device].Q} VAR</Td>
                  <Td>{tableData[device].cosPhi}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Stat>

      {/* Peak Data Box */}

      <Box
        display={"inline-block"}
        pl={5}
        pr={5}
        border={"solid 1px Black"}
        rounded={30}
        bg={"white"}
        p={4}
        mt={2}
      >
        <Heading textAlign={"center"} size="md" mb={1}>
          Peak Data
        </Heading>
        <Divider borderColor={"Black"} orientation="horizontal" m={2} />
        <HStack>
          {Object.keys(PerakData).map((device, index) => (
            <Box
              display={"inline-block"}
              pl={5}
              pr={5}
              bg={"gray.200"}
              rounded={30}
              shadow={"lg"}
              key={index}
              p={4}
            >
              <Text
                fontWeight="bold"
                bg={"white"}
                color={"black"}
                rounded={50}
                textAlign={"center"}
                p={1}
                mb={2}
              >
                Device: {device}
              </Text>
              <Text m={1}>
                <Text as="span" fontWeight="bold" color="blue.600">
                  Active Power(P):
                </Text>{" "}
                {PerakData[device][0]._value.toFixed(2)} W
              </Text>
              <Text m={1}>
                <Text as="span" fontWeight="bold" color="orange.500">
                  Apparent Power(S):
                </Text>{" "}
                {PerakData[device][2]._value.toFixed(2)} VA
              </Text>
              <Text m={1}>
                <Text as="span" fontWeight="bold" color="green.500">
                  Reactive Power(Q):
                </Text>{" "}
                {PerakData[device][3]._value.toFixed(2)} VAR
              </Text>
            </Box>
          ))}
        </HStack>
      </Box>
    </Box>
  );
};

export default HomePage;
