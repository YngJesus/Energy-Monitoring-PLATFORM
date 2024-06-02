import React, { useContext, useEffect } from "react";
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  HStack,
  Box,
  Text,
} from "@chakra-ui/react";
import { GlobalContext } from "../../../context/GlobalWrapper";
import TypeStat from "./TypeStat";
import {
  AiFillUsb,
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
} from "react-icons/ai";

function DevicesStat() {
  const {
    DevicesNumber,
    AssignedDevices,
    OffilneDevices,
    UnAssignedDevice,
    AssignedDevice,
    NewDevicesNumber,
    newdeviceCount,
    deviceCount,
  } = useContext(GlobalContext);

  useEffect(() => {
    DevicesNumber();
  }, []);
  useEffect(() => {
    NewDevicesNumber();
  }, []);
  useEffect(() => {
    AssignedDevices();
  }, []);
  useEffect(() => {
    OffilneDevices();
  }, []);
  return (
    <>
      <HStack spacing={4}>
        <Stat
          display={"inline-block"}
          p={1}
          pl={5}
          pr={5}
          border={"solid 3px #6366F1"}
          rounded={30}
        >
          <StatLabel fontWeight={700} ml={3} fontSize={"xl"}>
            Total Devices
          </StatLabel>
          <StatNumber ml={6} fontSize={"3xl"}>
            {deviceCount}
          </StatNumber>
          <StatHelpText ml={1} fontSize={"md"}>
            <Box display={"flex"}>
              <Text mr={1}>Device</Text>
              <AiFillUsb size={25} />
            </Box>
          </StatHelpText>
        </Stat>
        <Stat
          display={"inline-block"}
          p={1}
          pl={5}
          pr={5}
          border={"solid 3px #6366F1"}
          rounded={30}
        >
          <StatLabel fontWeight={700} ml={3} fontSize={"xl"}>
            New Devices
          </StatLabel>
          <StatNumber ml={6} fontSize={"3xl"}>
            {newdeviceCount}
          </StatNumber>
          <StatHelpText ml={1} fontSize={"md"}>
            <StatArrow type="increase" />
            This Week
          </StatHelpText>
        </Stat>
        <Stat
          display={"inline-block"}
          p={1}
          pl={5}
          pr={5}
          border={"solid 3px #6366F1"}
          rounded={30}
        >
          <StatLabel fontWeight={700} ml={3} fontSize={"xl"}>
            Total
          </StatLabel>
          <StatNumber ml={6} fontSize={"3xl"}>
            {AssignedDevice}
          </StatNumber>
          <StatHelpText ml={1} fontSize={"md"}>
            <Box display={"flex"}>
              <AiOutlineCheckCircle size={25} color="green" />
              <Text ml={1}>Assigned Devices</Text>
            </Box>
          </StatHelpText>
        </Stat>
        <Stat
          display={"inline-block"}
          p={1}
          pl={5}
          pr={5}
          border={"solid 3px #6366F1"}
          rounded={30}
        >
          <StatLabel fontWeight={700} ml={3} fontSize={"xl"}>
            Total
          </StatLabel>
          <StatNumber ml={6} fontSize={"3xl"}>
            {UnAssignedDevice}
          </StatNumber>
          <StatHelpText ml={1} fontSize={"md"}>
            <Box display={"flex"}>
              <AiOutlineCloseCircle size={25} color="red" />
              <Text ml={1}>Unassigned Devices</Text>
            </Box>
          </StatHelpText>
        </Stat>
      </HStack>
      <TypeStat />
    </>
  );
}

export default DevicesStat;
