import { Box, Divider, Image, Text } from "@chakra-ui/react";
import React from "react";
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

function SideBarUser() {
  const id = localStorage.getItem("id");
  console.log(id);

  const navigate = useNavigate();

  function LogOut() {
    localStorage.clear();
    navigate("/User-login");
  }
  return (
    <>
      <Box m={2}>
        <Image mt={10} mb={5} height={100} src="/img/whlh.png" alt="Logo" />
        <Box
          m="15px 10px"
          bg="rgba(255, 255, 255, 0.04)"
          padding={"3px "}
          rounded={8}
          color={"#9DA4AE"}
        >
          <Text fontSize={28} pb={2} ml={3} fontWeight={500} color={"white"}>
            Dashboard
          </Text>
        </Box>
      </Box>
      <Divider orientation="horizontal" />
      <Box m={"40px 40px"} color={"#9DA4AE"}>
        <Link to="/User-Dashboard">
          <Text
            display={"flex"}
            alignItems={"center"}
            gap={5}
            // bg={"red"}
            mb={5}
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

        <Link to="/TotalEnergy">
          <Text
            display={"flex"}
            alignItems={"center"}
            gap={5}
            // bg={"red"}
            mb={5}
            p={2}
            rounded={200}
            fontSize={14}
            cursor={"pointer"}
            _hover={{ color: "#6366F1", bg: "#FFFFFF0A" }}
          >
            <AiOutlineTool size={"20"} />
            TotalEnergy
          </Text>
        </Link>
        <Link to="/Energy-Cost">
          <Text
            display={"flex"}
            alignItems={"center"}
            gap={5}
            // bg={"red"}
            mb={5}
            p={2}
            rounded={200}
            fontSize={14}
            cursor={"pointer"}
            _hover={{ color: "#6366F1", bg: "#FFFFFF0A" }}
          >
            <AiOutlineTool size={"20"} />
            EnergyCost
          </Text>
        </Link>
        <Link to="/CompareDevices">
          <Text
            display={"flex"}
            alignItems={"center"}
            gap={5}
            // bg={"red"}
            mb={5}
            p={2}
            rounded={200}
            fontSize={14}
            cursor={"pointer"}
            _hover={{ color: "#6366F1", bg: "#FFFFFF0A" }}
          >
            <AiOutlineTool size={"20"} />
            CompareDevices
          </Text>
        </Link>
        <Link to="/PeakUsageTimes">
          <Text
            display={"flex"}
            alignItems={"center"}
            gap={5}
            // bg={"red"}
            mb={5}
            p={2}
            rounded={200}
            fontSize={14}
            cursor={"pointer"}
            _hover={{ color: "#6366F1", bg: "#FFFFFF0A" }}
          >
            <AiOutlineTool size={"20"} />
            PeakUsageTimes
          </Text>
        </Link>
      </Box>
      <Divider orientation="horizontal" />
      <Box m={"20px 40px"} color={"#9DA4AE"}>
        <Link to={`/userProfile/${id}`}>
          <Text
            display={"flex"}
            alignItems={"center"}
            gap={5}
            // bg={"red"}
            mb={5}
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
          mb={5}
          p={2}
          rounded={200}
          fontSize={14}
          cursor={"pointer"}
          _hover={{ color: "#6366F1", bg: "#FFFFFF0A" }}
          onClick={LogOut}
        >
          <AiOutlineLogout size={"20"} />
          Logout
        </Text>
      </Box>
    </>
  );
}

export default SideBarUser;
