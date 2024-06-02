import { Box, Divider, Image, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import {
  AiOutlineUnorderedList,
  AiOutlineUser,
  AiOutlineTool,
  AiOutlineLogout,
  AiFillPlusCircle,
  AiOutlineSetting,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalWrapper";

function SideBar() {
  const id = localStorage.getItem("id");

  const { FindAdmin } = useContext(GlobalContext);
  const navigate = useNavigate();

  function LogOut() {
    localStorage.clear();
    navigate("/Login");
  }
  return (
    <Box position="fixed">
      <Box m={2}>
        <Image
          ml={6}
          mt={7}
          mb={4}
          height={100}
          src="/img/whlh.png"
          alt="Logo"
        />
        <Box
          m="15px 10px"
          bg="rgba(255, 255, 255, 0.04)"
          padding={"3px "}
          rounded={8}
          color={"#9DA4AE"}
        >
          <Text fontSize={25} pb={2} ml={9} fontWeight={500} color={"white"}>
            Dashboard
          </Text>
        </Box>
      </Box>
      <Divider orientation="horizontal" w={"260px"} />
      <Box m={"40px 40px"} color={"#9DA4AE"}>
        <Link to="/dashboard">
          <Text
            display={"flex"}
            alignItems={"center"}
            gap={5}
            // bg={"red"}
            mb={4}
            p={2}
            rounded={200}
            fontSize={14}
            cursor={"pointer"}
            _hover={{ color: "#6366F1", bg: "#FFFFFF0A" }}
          >
            <AiOutlineUnorderedList size={"20"} />
            Overview
          </Text>
        </Link>
        <Link to="/users-page">
          <Text
            display={"flex"}
            alignItems={"center"}
            gap={5}
            // bg={"red"}
            mb={4}
            p={2}
            rounded={200}
            fontSize={14}
            cursor={"pointer"}
            _hover={{ color: "#6366F1", bg: "#FFFFFF0A" }}
          >
            <AiOutlineUser size={"20"} />
            Users
          </Text>
        </Link>
        <Link to="/devices-page">
          <Text
            display={"flex"}
            alignItems={"center"}
            gap={5}
            // bg={"red"}
            mb={4}
            p={2}
            rounded={200}
            fontSize={14}
            cursor={"pointer"}
            _hover={{ color: "#6366F1", bg: "#FFFFFF0A" }}
          >
            <AiOutlineTool size={"20"} />
            Devices
          </Text>
        </Link>
        {/* <Link to="/Signup">
          <Text
            display={"flex"}
            alignItems={"center"}
            gap={5}
            // bg={"red"}
            mb={4}
            p={2}
            rounded={200}
            fontSize={14}
            cursor={"pointer"}
            _hover={{ color: "#6366F1", bg: "#FFFFFF0A" }}
          >
            <AiFillPlusCircle size={"20"} />
            Add Admin
          </Text>
        </Link> */}
      </Box>
      <Divider orientation="horizontal" />
      <Box
        m={"20px 40px"}
        color={"#9DA4AE"}
        onClick={() => {
          FindAdmin(id);
          console.log(id);
        }}
      >
        <Link to={`/admin/${id}`}>
          <Text
            display={"flex"}
            alignItems={"center"}
            gap={5}
            // bg={"red"}
            mb={4}
            p={2}
            rounded={200}
            fontSize={14}
            cursor={"pointer"}
            _hover={{ color: "#6366F1", bg: "#FFFFFF0A" }}
          >
            <AiOutlineSetting size={"20"} />
            Profile
          </Text>
        </Link>
        <Text
          display={"flex"}
          alignItems={"center"}
          gap={5}
          // bg={"red"}
          mb={4}
          p={2}
          rounded={200}
          fontSize={14}
          cursor={"pointer"}
          _hover={{ color: "#6366F1", bg: "#FFFFFF0A" }}
          onClick={LogOut}
        >
          <AiOutlineLogout size={"20"} />
          LogOut
        </Text>
      </Box>
    </Box>
  );
}

export default SideBar;
