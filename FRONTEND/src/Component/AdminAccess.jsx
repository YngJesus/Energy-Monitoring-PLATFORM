import React from "react";

import { Box, Button, Flex, Image, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const AdminAccess = () => {
  return (
    <Flex align="center" justify="center" height="100vh">
      <Box>
        <Box>
          <Text m={5} as={"b"} fontSize={"3xl"}>
            ADMIN ACCESS ONLY.
          </Text>
          <Text m={5}>
            You are not authorized to enter this area.
            <br /> Please click the button below to exit.
          </Text>
          <Link to="/Login">
            <Button
              ml={5}
              variant="outline"
              size="lg"
              color={"white"}
              colorScheme={"white"}
              _hover={{ bg: "#474bed" }}
              bg="#6366F1"
            >
              Exit
            </Button>
          </Link>
        </Box>
      </Box>
      <Box ml="4">
        <Box boxSize="sm">
          <Image rounded={200} src="/img/adon.jpeg" alt="NotFound Image" />
        </Box>
      </Box>
    </Flex>
  );
};

export default AdminAccess;
