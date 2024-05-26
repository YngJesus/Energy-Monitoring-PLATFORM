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
import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../../context/GlobalWrapper";
import InputsGroup from "../shared/InputsGroup";
import SelectGroup from "../shared/SelectGroup";

function DrawerDevice() {
  const {
    isOpen,
    onClose,
    AddDevice,
    errors,
    device,
    setErrors,
    UpdateDevice,
  } = useContext(GlobalContext);
  const [form, setForm] = useState({});
  const onChangeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const onAdd = () => {
    AddDevice(form, setForm);
  };
  const onUpdate = () => {
    UpdateDevice(form, setForm, form._id);
  };
  useEffect(() => {
    setForm(device);
  }, [device]);
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
            Create/Update Device
          </DrawerHeader>

          <DrawerBody margin={2} boxShadow={"base"}>
            <Stack spacing={"24px"}>
              <InputsGroup
                onChangeHandler={onChangeHandler}
                name="Name"
                type="text"
                value={form?.Name}
                errors={errors?.Name}
              />

              <InputsGroup
                onChangeHandler={onChangeHandler}
                value={form?.Ref}
                name="Ref"
                type="text"
                errors={errors?.Ref}
              />

              <InputsGroup
                onChangeHandler={onChangeHandler}
                value={form?.Notes}
                name="Notes"
                type="text"
                errors={errors?.Notes}
              />
              <SelectGroup
                onChangeHandler={onChangeHandler}
                name="Type"
                Option1="production"
                Option2="consumption"
                value={form?.Type}
                errors={errors?.Type}
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

export default DrawerDevice;
