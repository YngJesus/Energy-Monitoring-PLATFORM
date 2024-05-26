import React, { useContext, useState, useEffect } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Stack,
} from "@chakra-ui/react";
import InputsGroup from "../shared/InputsGroup";
import { GlobalContext } from "../../../context/GlobalWrapper";
import SelectGroup from "../shared/SelectGroup";

const ProfileDrawer = ({
  isOpen,
  onClose,
  profileData,
  token,
  setUsers,
  updateUserInfo,
}) => {
  const { Update, errors, setErrors } = useContext(GlobalContext);
  const [form, setForm] = useState({});

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && profileData) {
      setForm(profileData);
    }
  }, [isOpen, profileData, setForm]);

  const onChangeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      const updatedUser = await Update(
        form,
        setForm,
        profileData._id,
        token,
        setErrors,
        onClose,
        setUsers
      );
      updateUserInfo(updatedUser); // Call the function with the updated admin info
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader bg={"#6366F1"} color={"white"}>
          Edit Profile
        </DrawerHeader>

        <DrawerBody margin={2} boxShadow={"base"}>
          <Stack spacing={"24px"}>
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
            <InputsGroup
              onChangeHandler={onChangeHandler}
              value={form?.Password}
              name="Password"
              type="password"
              errors={errors?.Password}
            />
          </Stack>
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button
            colorScheme="white"
            _hover={{ bg: "#474bed" }}
            bg={"#6366F1"}
            isLoading={isLoading}
            onClick={onSubmit}
          >
            Save
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ProfileDrawer;
