import {
  Avatar,
  Box,
  Flex,
  MenuButton,
  Spacer,
  Tag,
  TagLabel,
  Text,
} from "@chakra-ui/react";
import {
  AiOutlineSearch,
  AiOutlineBell,
  AiOutlineLogout,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";

import React from "react";

function DashNavbar() {
  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");
  const navigate = useNavigate();

  function LogOut() {
    localStorage.clear();
    navigate("/Login");
  }

  return (
    <Flex m={5} display={"flex"} alignItems={"center"}>
      <Spacer />

      <Box display={"flex"} alignItems={"center"} gap={25}>
        {/* <Box _hover={{ bg: "purple.200" }} p={1} rounded={"full"}>
          <AiOutlineBell size={23} color="#6366F1" cursor={"pointer"} />
        </Box> */}
        <Box
          _hover={{ color: "white", bg: "purple.200" }}
          p={1}
          rounded={"full"}
        >
          <AiOutlineLogout
            size={23}
            color="#6366F1"
            cursor={"pointer"}
            onClick={LogOut}
          />
        </Box>
        <Avatar
          name={`${firstName} ${lastName}`}
          bg={"gray.700"}
          color={"white"}
          cursor={"pointer"}
        />{" "}
      </Box>
    </Flex>
  );
}

export default DashNavbar;
