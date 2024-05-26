import {
  Box,
  Input,
  Button,
  Text,
  Image,
  RadioGroup,
  Radio,
  Stack,
  Grid,
  Divider,
} from "@chakra-ui/react";
import styles from "../../styles/LoginPage.module.css"; // Import the CSS module
import { Link } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalWrapper";
import { useContext, useEffect, useState } from "react";
import SelectGroup from "../../Component/utils/shared/SelectGroup";
import InputsGroup from "../../Component/utils/shared/InputsGroup";
import { useNavigate } from "react-router-dom";

function UserSignup() {
  const { Add, errors, form, setForm, user, setErrors } =
    useContext(GlobalContext);

  const onChangeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate(); // create a navigate object

  const onAdd = async () => {
    try {
      const result = await Add(form, setForm);
      console.log(result);
      if (result) {
        navigate("/User-login"); // redirect to /login
      } else {
        setErrors("An error occurred. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setErrors("An error occurred. Please try again.");
    }
  };

  // useEffect(() => {
  //   setForm(user || {});
  // }, [user]);

  return (
    <Box
      p={4}
      textAlign="center"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bg="gray.50"
      height="100vh"
      className={styles.login}
    >
      <Box
        w="lg"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p={6}
        m={4}
        bg="gray.100"
        boxShadow="xl"
      >
        <Image
          px={110}
          src="/img/bllg.png"
          alt="EnergiWave Logo"
          mb={2}
          height={90}
          ml={"45px"}
        />
        <Text fontSize="2xl" fontWeight="semibold" mb={4}>
          Register for EnergiWave
        </Text>
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          <InputsGroup
            onChangeHandler={onChangeHandler}
            value={form?.firstName}
            name="firstName"
            type="text"
            errors={errors?.firstName}
          />
          <InputsGroup
            onChangeHandler={onChangeHandler}
            value={form?.lastName}
            name="lastName"
            type="text"
            errors={errors?.lastName}
          />
          <InputsGroup
            onChangeHandler={onChangeHandler}
            value={form?.Email}
            name="Email"
            type="email"
            errors={errors?.Email}
          />
          <InputsGroup
            onChangeHandler={onChangeHandler}
            value={form?.Number}
            name="Number"
            type="number"
            errors={errors?.Number}
          />
          <SelectGroup
            onChangeHandler={onChangeHandler}
            name="Gender"
            Option1="male"
            Option2="female"
            value={form?.Gender}
            errors={errors?.Gender}
          />
          <InputsGroup
            onChangeHandler={onChangeHandler}
            value={form?.Password}
            name="Password"
            type="password"
            errors={errors?.Password}
          />
        </Grid>
        <Button width="full" mt={4} mb={4} colorScheme="blue" onClick={onAdd}>
          Register
        </Button>
        <Divider orientation="horizontal" borderColor="Black.300" />
        <Text fontSize="sm" mt={4}>
          Already have an account?{" "}
          <Box as="span" color="blue.500">
            {" "}
            <Link to="/User-login" color="blue.500">
              Sign In
            </Link>
          </Box>
        </Text>
      </Box>
    </Box>
  );
}

export default UserSignup;
