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

const AdminDrawer = ({
  isOpen,
  onClose,
  profileData,
  token,
  setAdmins,
  updateAdminInfo,
}) => {
  const { UpdateAdmin, formAdmin, setFormAdmin, errors, setErrors } =
    useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && profileData) {
      setFormAdmin(profileData);
    }
  }, [isOpen, profileData, setFormAdmin]);

  const onChangeHandler = (event) => {
    setFormAdmin({ ...formAdmin, [event.target.name]: event.target.value });
  };

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      const updatedAdmin = await UpdateAdmin(
        formAdmin,
        setFormAdmin,
        profileData._id,
        token,
        setErrors,
        onClose,
        setAdmins
      );
      updateAdminInfo(updatedAdmin); // Call the function with the updated admin info
    } catch (error) {
      console.error("Error updating admin:", error);
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

export default AdminDrawer;
