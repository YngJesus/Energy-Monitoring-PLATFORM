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

function UserNavbar() {
  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");
  const navigate = useNavigate();

  function LogOut() {
    localStorage.clear();
    navigate("/User-login");
  }

  return (
    <Flex m={5} display={"flex"} alignItems={"center"}>
      <Spacer />

      <Box display={"flex"} alignItems={"center"} gap={25}>
        {/* <Box _hover={{ bg: "#D3D3D3" }} p={1} rounded={"full"}>
          <AiOutlineBell size={23} color="#454545" cursor={"pointer"} />
        </Box> */}
        <Box _hover={{ color: "white", bg: "#D3D3D3" }} p={1} rounded={"full"}>
          <AiOutlineLogout
            size={23}
            color="#454545"
            cursor={"pointer"}
            onClick={LogOut}
          />
        </Box>

        <Avatar
          name={`${firstName} ${lastName}`}
          bg={"gray.700"}
          color={"white"}
        />
      </Box>
    </Flex>
  );
}

export default UserNavbar;
