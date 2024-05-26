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
    <Box p={5}>
      {/* Welcome Header */}
      <VStack spacing={5} align="start">
        <HStack>
          <Avatar name={firstName} />
          <Heading>Welcome, {firstName}!</Heading>
        </HStack>
        <Text fontSize="xl">Here's an overview of your energy usage:</Text>
      </VStack>

      {/* Total Cost */}
      <Text fontSize="lg" fontWeight="bold" mt={5}>
        Total Cost:{" "}
        {totalCost ? `${parseFloat(totalCost).toFixed(2)} TND` : "N/A"}
      </Text>

      {/* Linked Devices Section */}
      <Box mt={10}>
        <Heading size="md">Your Devices</Heading>
        <List spacing={3} mt={3}>
          {linkedDevices && linkedDevices.length > 0 ? (
            linkedDevices.map((device, index) => (
              <ListItem key={index}>
                <HStack>
                  <Icon as={FaPlug} />
                  <Text>{device}</Text>
                </HStack>
              </ListItem>
            ))
          ) : (
            <Text>No linked devices found.</Text>
          )}
        </List>
      </Box>

      {/* Energy Data Table */}
      <Box mt={10}>
        <Heading size="md">Energy Data</Heading>
        <Table variant="simple" mt={3}>
          <Thead>
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

      {/* Peak Data Box */}
      <Box mt={10}>
        <Heading size="md">Peak Data</Heading>
        <VStack align="start" mt={3}>
          {Object.keys(PerakData).map((device, index) => (
            <Box key={index} bg="gray.200" p={4} borderRadius="md">
              <Text fontWeight="bold">Device: {device}</Text>
              <Text>
                Active Power(P): {PerakData[device][0]._value.toFixed(2)} W
              </Text>
              <Text>
                Apparent Power(S): {PerakData[device][2]._value.toFixed(2)} VA
              </Text>
              <Text>
                Reactive Power(Q): {PerakData[device][3]._value.toFixed(2)} VAR
              </Text>
            </Box>
          ))}
        </VStack>
      </Box>
    </Box>
  );
};

export default HomePage;
