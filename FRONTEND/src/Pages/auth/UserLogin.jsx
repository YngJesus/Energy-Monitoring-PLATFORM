import {
  Box,
  Input,
  Button,
  Text,
  Image,
  Divider,
  Toast,
  useToast,
  FormControl,
} from "@chakra-ui/react";
import styles from "../../styles/LoginPage.module.css"; // Import the CSS module
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Header from "../Home interface page/parts/Header";

function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/Client/Login",
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
        localStorage.setItem("userRole", userRole); // Store userRole in localStorage
        const id = decodedToken.id;
        const firstName = decodedToken.firstName;
        const lastName = decodedToken.lastName;
        const linkedDevice = decodedToken.linkedDevice;

        localStorage.setItem("id", id);
        localStorage.setItem("firstName", firstName);
        localStorage.setItem("lastName", lastName);
        localStorage.setItem("linkedDevice", JSON.stringify(linkedDevice));
      } else {
        console.log("No token found in local storage");
        // Handle the case where no token is present (optional)
      }
      navigate("/User-Dashboard");
    } catch (err) {
      console.log("Error during login:", err);
      Toast({
        title: "Error",
        description: "Invalid username or password",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Header />
      <Box
        // p={4}
        textAlign="center"
        display="flex"
        justifyContent="center"
        alignItems="center"
        bg="gray.50"
        // bg="red"
        // height="100vh"
        className={styles.login}
      >
        <Box
          maxW="md"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          px={70}
          py={6}
          // p={6}
          m={2}
          bg="gray.200"
          boxShadow="xl"
          border={"solid 2px #CBD5E0 "}
        >
          <form onSubmit={handleLogin}>
            <Image
              src="/img/LoginUSER.svg"
              maxH="130px"
              maxW="full"
              alt="User Login Illustration"
              mb={2}
              ml={"60px"}
            />
            <Image
              src="/img/bllg.png"
              alt="User Login Illustration"
              mb={2}
              height={90}
              ml={"60px"}
            />
            <Text fontSize="2xl" fontWeight="semibold" mb={4}>
              Sign in to EnergiWave
            </Text>
            <FormControl id="email">
              {" "}
              <Input
                placeholder="Email Address"
                type="email"
                mb={4}
                borderColor="gray.300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormControl>

            <FormControl id="password">
              <Input
                placeholder="Password"
                mb={4}
                type="password"
                borderColor="gray.300"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FormControl>

            <Button
              bg={"#000329"}
              _hover={{ bgColor: "#080E4B" }}
              rounded={20}
              color={"white"}
              fontSize={15}
              colorScheme="white"
              width="full"
              type="submit"
              mb={4}
            >
              Sign In
            </Button>
            <Divider orientation="horizontal" borderColor="Black.300" />

            <Text fontSize="sm" mt={4}>
              Don't have an account?{" "}
              <Box as="span" color="blue.500">
                {" "}
                <Link to="/User-signup">Register</Link>
              </Box>
            </Text>
          </form>
        </Box>
      </Box>
    </>
  );
}

export default UserLogin;
