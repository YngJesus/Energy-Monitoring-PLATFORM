import React, { useContext, useEffect } from "react";
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Box,
  HStack,
  VStack,
  Text,
} from "@chakra-ui/react";
import { GlobalContext } from "../../../context/GlobalWrapper";
import TableStat from "../UsersPage/TableStat";
import GenderStat from "./GenderStat";
import { AiOutlineUser } from "react-icons/ai";
function UsersStat() {
  const { UsersNumber, NewUsersNumber, newusersCount, usersCount } =
    useContext(GlobalContext);

  useEffect(() => {
    UsersNumber();
  }, []);
  useEffect(() => {
    NewUsersNumber();
  }, []);

  return (
    <>
      <HStack spacing={15}>
        <Stat
          display={"inline-block"}
          p={1}
          pl={5}
          pr={5}
          border={"solid 3px #6366F1"}
          rounded={30}
        >
          <StatLabel fontWeight={700} ml={3} fontSize={"xl"}>
            Total Users
          </StatLabel>
          <StatNumber ml={6} fontSize={"3xl"}>
            {usersCount}
          </StatNumber>
          <StatHelpText ml={3} fontSize={"md"}>
            <Box display={"flex"}>
              <Text mr="1">User</Text>
              <AiOutlineUser size={25} />
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
            New users
          </StatLabel>
          <StatNumber ml={6} fontSize={"3xl"}>
            {newusersCount}
          </StatNumber>
          <StatHelpText ml={1} fontSize={"md"}>
            <StatArrow type="increase" />
            This Week
          </StatHelpText>
        </Stat>
      </HStack>
      <HStack spacing={4} mt={3}>
        <GenderStat />
        <TableStat />
      </HStack>
    </>
  );
}

export default UsersStat;
