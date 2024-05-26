import React, { useContext, useEffect } from "react";
import {
  Box,
  Text,
  Divider,
  VStack,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";
import { GlobalContext } from "../../context/GlobalWrapper";
import { EmailIcon, PhoneIcon, InfoOutlineIcon } from "@chakra-ui/icons";
import { FaDesktop, FaTabletAlt, FaMobileAlt } from "react-icons/fa";
import styles from "../../styles/LoginPage.module.css"; // Import the CSS module

function OneDevice({ deviceId }) {
  const { device, FindDevice } = useContext(GlobalContext);

  const memoizedFindDevice = React.useMemo(() => {
    const cache = {};
    return (deviceId) => {
      if (cache[deviceId]) {
        return cache[deviceId];
      }
      const result = FindDevice(deviceId);
      cache[deviceId] = result;
      return result;
    };
  }, []); // Empty dependency array to prevent memo itself from re-running

  useEffect(() => {
    console.log("OneUser deviceId:", deviceId);
    const user = memoizedFindDevice(deviceId);
    // Use the retrieved user data here
  }, [deviceId, memoizedFindDevice]);
  const cardBg = useColorModeValue("blue.100", "blue.900");
  const cardBorder = useColorModeValue("gray", "orange.700");

  // Determine the device icon based on the device type

  return (
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
      <Text fontSize="lg" color={"black"} fontWeight="bold" mb={4}>
        <Icon as={InfoOutlineIcon} mr={2} />
        Device Information:
      </Text>
      <Divider mb={4} />
      <VStack spacing={4} align="stretch">
        <Text fontSize="md">
          <Box mr={2} as="span" color={"black"}>
            Name:
          </Box>
          {device?.Name}
        </Text>
        <Text fontSize="md">
          <Box mr={2} as="span" color={"black"}>
            Reference:
          </Box>
          {device?.Ref}
        </Text>
        <Text fontSize="md">
          <Box mr={2} as="span" color={"black"}>
            Notes:
          </Box>
          {device?.Notes}
        </Text>
        <Text fontSize="md">
          <Box mr={2} as="span" color={"black"}>
            Type:
          </Box>
          {device?.Type}
        </Text>
        <Text fontSize="md">
          <Box mr={2} as="span" color={"black"}>
            Status:
          </Box>
          {device?.Status}
        </Text>
      </VStack>
    </Box>
  );
}

export default OneDevice;
