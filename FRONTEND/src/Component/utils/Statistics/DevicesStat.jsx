import React, { useContext, useEffect } from "react";
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  HStack,
} from "@chakra-ui/react";
import { GlobalContext } from "../../../context/GlobalWrapper";
import TypeStat from "./TypeStat";

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
            Devices
          </StatLabel>
          <StatNumber ml={6} fontSize={"3xl"}>
            {deviceCount}
          </StatNumber>
          <StatHelpText ml={1} fontSize={"md"}>
            <StatArrow type="increase" />
            23.36%
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
            <StatArrow type="increase" />
            Assigned Devices
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
            <StatArrow type="decrease" />
            Unassigned Devices
          </StatHelpText>
        </Stat>
      </HStack>
      <TypeStat />
    </>
  );
}

export default DevicesStat;
