// components/Header.js
import React from "react";
import {
  Flex,
  Box,
  Heading,
  Link,
  Button,
  Image,
  Spacer,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/user-login");
  };
  const handleSignUp = () => {
    navigate("/User-signup");
  };
  const handleHome = () => {
    navigate("/HomeInerface");
  };

  return (
    <Flex
      px={4}
      alignItems="center"
      justifyContent="space-between"
      bg="gray.100"
      color="Black"
      borderBottom={"solid 1px black"}
    >
      <Box>
        <Heading size="md">
          <Image
            height="80px"
            marginRight="10px"
            src="/img/bllg.png"
            alt="EnergiWave Logo"
          ></Image>
        </Heading>
      </Box>
      <Spacer />
      <Box ml={50} fontSize={20}>
        <Link onClick={handleHome} mr={4}>
          Home
        </Link>
        <Link href="#services" mr={4}>
          Services
        </Link>
        <Link mr={4}>About</Link>
      </Box>
      <Spacer />
      <Box>
        <Button
          bg={"#000329"}
          _hover={{ bgColor: "#080E4B" }}
          rounded={20}
          color={"white"}
          fontSize={15}
          colorScheme="white"
          mr={2}
          onClick={handleLogin}
        >
          Login
        </Button>
        <Button
          bg={"#000329"}
          _hover={{ bgColor: "#080E4B" }}
          rounded={20}
          color={"white"}
          fontSize={15}
          colorScheme="white"
          onClick={handleSignUp}
        >
          Sign Up
        </Button>
      </Box>
    </Flex>
  );
};

export default Header;
