import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Flex,
  Text,
  Heading,
  VStack,
  Avatar,
  StackDivider,
  Input,
  FormControl,
  FormLabel,
  Button,
  useDisclosure,
  HStack,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import AdminDrawer from "../utils/Admin/AdminDrawer";
import { GlobalContext } from "../../context/GlobalWrapper";

function MainProfile({ adminId }) {
  const { admin, FindAdmin } = useContext(GlobalContext);
  const token = localStorage.getItem("token");

  const memoizedFindAdmin = React.useMemo(() => {
    const cache = {};
    return (adminId) => {
      if (cache[adminId]) {
        return cache[adminId];
      }
      const result = FindAdmin(adminId);
      cache[adminId] = result;
      return result;
    };
  }, []);

  useEffect(() => {
    console.log("OneUser adminId:", adminId);
    memoizedFindAdmin(adminId);
  }, [adminId, memoizedFindAdmin]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [admins, setAdmins] = useState([]);
  const [profileData, setProfileData] = useState({});

  useEffect(() => {
    if (admin) {
      setProfileData({
        Username: admin.Username,
        firstName: admin.firstName,
        lastName: admin.lastName,
        Email: admin.Email,
        Number: admin.Number,
        _id: admin._id,
      });
    }
  }, [admin]);

  return (
    <Flex justify="center" align="center" height={"90vh"}>
      <Box
        width={{ base: "90%", md: "90%", lg: "90%" }}
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        px="6"
        py={3}
        bg="white"
        boxShadow="2xl"
        backdropFilter="blur(10px)"
      >
        <VStack
          spacing={4}
          align="start"
          divider={<StackDivider borderColor="gray.200" />}
        >
          <Box>
            <Avatar
              name={`${profileData.firstName} ${profileData.lastName}`}
              size={"2xl"}
            />
            <Button
              ml={"600px"}
              mt={"90px"}
              colorScheme="teal"
              variant="outline"
              onClick={onOpen}
            >
              Update Profile
            </Button>
          </Box>

          <Heading size="lg" color="teal.600">
            {profileData.Username}
          </Heading>
          <HStack spacing={2}>
            <FormControl id="firstName">
              <FormLabel fontWeight={900}>FirstName</FormLabel>
              <Input
                width={"400px"}
                type="text"
                name="firstName"
                value={profileData.firstName}
                isReadOnly
              />
            </FormControl>
            <FormControl id="lastName">
              <FormLabel fontWeight={900}>LastName</FormLabel>
              <Input
                width={"400px"}
                type="text"
                name="lastName"
                value={profileData.lastName}
                isReadOnly
              />
            </FormControl>
          </HStack>
          <FormControl id="email">
            <FormLabel fontWeight={900}> Email</FormLabel>
            <Input
              type="email"
              name="email"
              value={profileData.Email}
              isReadOnly
            />
          </FormControl>
          <FormControl id="phone">
            <FormLabel fontWeight={900}>Phone</FormLabel>
            <Input
              type="tel"
              name="number"
              value={profileData.Number}
              isReadOnly
            />
          </FormControl>
        </VStack>
      </Box>

      <AdminDrawer
        isOpen={isOpen}
        onClose={onClose}
        profileData={profileData}
        token={token} // Assuming you have a token in the admin context
        setAdmins={setAdmins}
      />
    </Flex>
  );
}

export default MainProfile;
