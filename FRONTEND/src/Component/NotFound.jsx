import { Box, Button, Image, Text, Flex } from "@chakra-ui/react";
import React from "react";

function NotFound() {
  return (
    <Flex align="center" justify="center" height="100vh">
      <Box>
        <Box>
          <Text m={5} as={"b"} fontSize={"3xl"}>
            UH OH! You're lost.
          </Text>
          <Text m={5}>
            The page you are looking for does not exist. <br />
            But you can click the button below to go <br /> back to the
            homepage.
          </Text>
          <Button
            ml={5}
            colorScheme="teal"
            variant="outline"
            size="lg"
            _hover={{ color: "white", bg: "teal.400" }}
          >
            Home
          </Button>
        </Box>
      </Box>
      <Box ml="4">
        <Box boxSize="sm">
          <Image src="./img/NotFound.jpg" alt="NotFound Image" />
        </Box>
      </Box>
    </Flex>
  );
}

export default NotFound;
