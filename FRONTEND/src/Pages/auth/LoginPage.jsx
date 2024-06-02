import { jwtDecode } from "jwt-decode";
import styles from "../../styles/LoginPage.module.css"; // Import the CSS module

import React, { useState } from "react";
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Image,
  Input,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/Admin/Login",
        {
          Email: email,
          Password: password,
        }
      );
      const token = response.data.token;
      console.log(token);
      localStorage.setItem("token", token);
      // Check if token exists before decoding
      if (token) {
        const decodedToken = jwtDecode(token);
        const userRole = decodedToken.roles; // Assuming roles are stored in a property named "roles"
        const firstName = decodedToken.firstName;
        const lastName = decodedToken.lastName;
        const Username = decodedToken.Username;
        const Email = decodedToken.Email;
        const Number = decodedToken.Number;
        const id = decodedToken.id;
        localStorage.setItem("userRole", userRole); // Store userRole in localStorage
        localStorage.setItem("firstName", firstName);
        localStorage.setItem("lastName", lastName);
        localStorage.setItem("Username", Username);
        localStorage.setItem("Email", Email);
        localStorage.setItem("Number", Number);
        localStorage.setItem("id", id);

        console.log("User Roles:", userRole); // This line is for demonstration purposes, remove in production

        // You can now use the userRole constant throughout your component
      } else {
        console.log("No token found in local storage");
        // Handle the case where no token is present (optional)
      }

      navigate("/dashboard");
    } catch (err) {
      console.log("Error during login:", err);
      toast({
        title: "Error",
        description: "Invalid username or password",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      bgImage="url('/img/bglogin.jpg')"
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgSize={"cover"}
      bgPos={"center"}
      className={styles.login}
    >
      <Box
        rounded={50}
        my={2}
        p={10}
        // pb={20}
        // maxWidth="356px"
        // mx="auto"
        boxShadow={"lg"}
        bgColor={"white"}
      >
        <form onSubmit={handleLogin}>
          <VStack spacing={6}>
            <Box>
              <Image height={100} src="/img/bllg.png" alt="Logo" />
            </Box>
            <Text fontSize={"29"} fontWeight={"800"}>
              Welcome to EnergiWave
            </Text>
            <Divider my={1} />
            <Text color={"black"} fontSize={21}>
              Please sign-in to open the admin dashboard{" "}
            </Text>
            <FormControl id="email">
              <Input
                size={"lg"}
                _hover={{ border: "1px solid #0040A2" }}
                border={"1px solid #7778E2"}
                rounded={20}
                placeholder="Enter Your Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormControl>
            <FormControl id="password">
              <Input
                size={"lg"}
                _hover={{ border: "1px solid #0040A2" }}
                border={"1px solid #7778E2"}
                rounded={20}
                placeholder="Enter Your Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FormControl>
            <Button
              rounded={20}
              bg="#6366F1"
              width={"300px"}
              colorScheme="teal"
              type="submit"
              _hover={{ bg: "#474bed" }}
            >
              Sign-in
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default LoginPage;
