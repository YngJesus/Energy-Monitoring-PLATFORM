import React, { useContext, useState, useEffect } from "react";
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
} from "@chakra-ui/react";
import { GlobalContext } from "../../../context/GlobalWrapper";
import DrawerUsers from "../../utils/UsersPage/Drawer";
import ProfileDrawer from "../../utils/UsersPage/ProfileDrawer";

const MainUserProfile = ({ userId }) => {
  const { user, FindOne } = useContext(GlobalContext);
  const token = localStorage.getItem("token");

  const memoizedFindOne = React.useMemo(() => {
    const cache = {};
    return (userId) => {
      if (cache[userId]) {
        return cache[userId];
      }
      const result = FindOne(userId);
      cache[userId] = result;
      return result;
    };
  }, []);

  useEffect(() => {
    console.log("OneUser userId:", userId);
    memoizedFindOne(userId);
  }, [userId, memoizedFindOne]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [users, setUsers] = useState([]);
  const [profileData, setProfileData] = useState({});

  useEffect(() => {
    if (user) {
      setProfileData({
        Gender: user.Gender,
        firstName: user.firstName,
        lastName: user.lastName,
        Email: user.Email,
        Number: user.Number,
        _id: user._id,
      });
    }
  }, [user]);
  console.log(user.linkedDevice);

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
            <Avatar name={`${user.firstName} ${user.lastName}`} size={"2xl"} />
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
            {`${user.firstName} ${user.lastName}`}
          </Heading>
          <FormControl id="email">
            <FormLabel>Email</FormLabel>
            <Input type="email" name="email" value={user.Email} isReadOnly />
          </FormControl>
          <FormControl id="phone">
            <FormLabel>Phone</FormLabel>
            <Input type="tel" name="number" value={user.Number} isReadOnly />
          </FormControl>
          <FormControl id="gender">
            <FormLabel>Gender</FormLabel>
            <Input type="text" name="gender" value={user.Gender} isReadOnly />
          </FormControl>
        </VStack>
      </Box>

      <ProfileDrawer
        isOpen={isOpen}
        onClose={onClose}
        profileData={profileData}
        token={token} // Assuming you have a token in the admin context
        setAdmins={setUsers}
      />
    </Flex>
  );
};

export default MainUserProfile;
