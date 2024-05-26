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
  FormErrorMessage,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../../context/GlobalWrapper";
import InputsGroup from "../shared/InputsGroup";
import SelectGroup from "../shared/SelectGroup";

function DrawerUsers() {
  const {
    isOpen,
    onClose,
    form,
    setForm,
    Add,
    errors,
    user,
    setErrors,
    Update,
  } = useContext(GlobalContext);
  const onChangeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const onAdd = () => {
    Add(form, setForm);
  };
  const onUpdate = () => {
    Update(form, setForm, form._id);
  };
  useEffect(() => {
    setForm(user);
  }, [user]);
  return (
    <>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton
            onClick={() => {
              onClose();
              setErrors({});
              setForm({});
            }}
          />
          <DrawerHeader bg={"#6366F1"} color={"white"}>
            Create/Update User
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
            </Stack>
          </DrawerBody>

          <DrawerFooter>
            <Button
              variant="outline"
              mr={3}
              onClick={() => {
                onClose();
                setErrors({});
                setForm({});
              }}
            >
              Cancel
            </Button>
            <Button
              colorScheme="white"
              _hover={{ bg: "#474bed" }}
              bg={"#6366F1"}
              onClick={() => (form._id ? onUpdate() : onAdd())}
            >
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default DrawerUsers;
