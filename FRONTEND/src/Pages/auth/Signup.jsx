import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  Heading,
  Center,
  Alert,
  AlertIcon,
  Divider,
  HStack,
} from "@chakra-ui/react";
import { GlobalContext } from "../../context/GlobalWrapper";
import InputsGroup from "../../Component/utils/shared/InputsGroup";
import { useNavigate } from "react-router-dom";

function Signup() {
  const { addAdmin, admin, errors, formAdmin, setFormAdmin, setErrors } =
    useContext(GlobalContext);

  const onChangeHandler = (e) => {
    setFormAdmin({ ...formAdmin, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate(); // create a navigate object

  const onAdd = async () => {
    // make sure this function is async
    const result = await addAdmin(formAdmin, setFormAdmin); // await the result of addAdmin
    console.log(result);
    if (result) {
      // if the result is successful
      navigate("/dashboard"); // redirect to /login
    } else {
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  // useEffect(() => {
  //   setFormAdmin();
  // }, [admin]);

  return (
    <Center pt={"50px"}>
      <Box
        p={4}
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="md"
        maxW="2xl"
        w="100%"
      >
        <Heading as="h3" size="lg" mb={4} textAlign="center">
          Register
        </Heading>
        <Text textAlign={"center"} color={"gray"}>
          Add new admin
        </Text>
        <Divider orientation="horizontal" mb={5} mt={5} borderColor="Black" />

        <HStack spacing={4} align="stretch" pb={3}>
          <InputsGroup
            onChangeHandler={onChangeHandler}
            value={formAdmin?.firstName}
            name="firstName"
            type="text"
            errors={errors?.firstName}
          />

          <InputsGroup
            onChangeHandler={onChangeHandler}
            value={formAdmin?.lastName}
            name="lastName"
            type="text"
            errors={errors?.lastName}
          />
        </HStack>
        <HStack pb={3}>
          <InputsGroup
            onChangeHandler={onChangeHandler}
            value={formAdmin?.Username}
            name="Username"
            type="text"
            errors={errors?.Username}
          />

          <InputsGroup
            onChangeHandler={onChangeHandler}
            value={formAdmin?.Email}
            name="Email"
            type="email"
            errors={errors?.Email}
          />
        </HStack>
        <HStack>
          <InputsGroup
            onChangeHandler={onChangeHandler}
            value={formAdmin?.Number}
            name="Number"
            type="number"
            errors={errors?.Number}
          />

          <InputsGroup
            onChangeHandler={onChangeHandler}
            value={formAdmin?.Password}
            name="Password"
            type="password"
            errors={errors?.Password}
          />
        </HStack>

        <VStack>
          <Button
            alignSelf={"center"}
            rounded={20}
            mt={5}
            bg="#6366F1"
            _hover={{ bg: "#474bed" }}
            width={300}
            color={"white"}
            onClick={onAdd}
          >
            Add Admin
          </Button>
        </VStack>
      </Box>
    </Center>
  );
}

export default Signup;
