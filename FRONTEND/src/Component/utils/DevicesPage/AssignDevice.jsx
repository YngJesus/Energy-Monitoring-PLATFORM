import React, { useContext, useState } from "react";
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast, // Import useToast from Chakra UI
} from "@chakra-ui/react";
import axios from "axios"; // Import Axios
import { GlobalContext } from "../../../context/GlobalWrapper";

function AssignDevice({ onClose, id }) {
  const [deviceRef, setDeviceRef] = useState("");
  const toast = useToast(); // Initialize useToast

  // Function to handle the POST request
  const { token } = useContext(GlobalContext);
  const DeviceAssigned = async () => {
    const headers = { Authorization: `Bearer ${token}` };

    try {
      // Make the POST request
      await axios.post(
        `http://localhost:3000/users/${id}/assign-device`,
        {
          Ref: deviceRef,
        },
        { headers }
      );
      // If successful, close the modal
      onClose();
      // Show success toast message
      toast({
        title: "Device Assigned",
        description: "The device has been successfully assigned.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      // If an error occurs, handle it
      console.error("Error assigning device:", error);
      // Optionally, you can add code to display an error message or other error handling logic
    }
  };

  return (
    <>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Assign Device</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Device Reference</FormLabel>
            <Input
              placeholder="Exemple: SHG50K"
              value={deviceRef}
              onChange={(e) => setDeviceRef(e.target.value)}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={DeviceAssigned}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </>
  );
}

export default AssignDevice;
