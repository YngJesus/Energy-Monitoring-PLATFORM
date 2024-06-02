// // components/Footer.js
// import React from "react";
// import { Box, Text, Link, Flex } from "@chakra-ui/react";

// const Footer = () => {
//   return (
//     <Box bg="blue.500" color="white" p={4} textAlign="center">
//       <Text>Contact Us: info@energiwave.com | 123-456-7890</Text>
//       <Flex justifyContent="center" mt={2}>
//         <Link mr={2} href="#terms">
//           Terms of Service
//         </Link>
//         <Link href="#privacy">Privacy Policy</Link>
//       </Flex>
//     </Box>
//   );
// };

// export default Footer;

import {
  Box,
  Flex,
  Text,
  Link,
  Input,
  Button,
  Image,
  Spacer,
} from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box bg="#080E4B" color="white" p={10}>
      <Flex direction={{ base: "column", md: "row" }} align="center">
        <Box mr={"25rem"}>
          <Image
            height="100px"
            marginRight="10px"
            src="/img/whlh.png"
            alt="EnergiWave Logo"
          ></Image>
          <Text fontSize={"xl"} mt={2}>
            +216 54 133 050
          </Text>
          <Text fontSize={"xl"}>info@energiwave.com</Text>
          <Text fontSize={"xl"} mt={2}>
            16192 Coastal Highway
          </Text>
          <Text fontSize={"xl"}>Lewes, DE 19958</Text>
          <Text fontSize={"xl"} mt={2}>
            Immeuble Gammoun
          </Text>
          <Text fontSize={"xl"}>Akouda Sousse</Text>
        </Box>

        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align="start"
          mt={{ base: 4, md: 0 }}
        >
          <Box mr={10}>
            <Text fontSize={"2xl"} fontWeight="bold">
              Company
            </Text>
            <Link fontSize={"lg"} mt={2}>
              Home
            </Link>
            <br />
            <Link fontSize={"lg"}>About Us</Link>
          </Box>
          <Box mr={10}>
            <Text fontSize={"2xl"} fontWeight="bold">
              Services
            </Text>
            <Link fontSize={"lg"}>Real-time Energy Monitoring</Link>
            <br />
            <Link fontSize={"lg"} mt={2}>
              Consumption Cost
            </Link>
            <br />
            <Link fontSize={"lg"} mt={2}>
              Devices Consumption Comparison
            </Link>
            <br />
            <Link fontSize={"lg"} mt={2}>
              Peak Usage Optimization
            </Link>
          </Box>
          <Box>
            <Text fontSize={"2xl"} fontWeight="bold">
              Stay Tuned
            </Text>
            <Input placeholder="Your Email" mt={2} />
            <Button mt={2}>Sign Up</Button>
          </Box>
        </Flex>
      </Flex>
      <Flex justify="space-between" align="center" mt={10}>
        <Text>© 2024 EnergiWave. All rights reserved.</Text>
        <Flex>
          <Link mr={4}>Terms and Conditions</Link>
          <Link>Privacy policy</Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Footer;
