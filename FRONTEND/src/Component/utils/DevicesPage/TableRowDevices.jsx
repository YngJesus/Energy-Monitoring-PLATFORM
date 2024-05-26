import {
  AlertDialog,
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Td,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";

import React, { useContext } from "react";
import { AiFillEye, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import DelOver from "../shared/DeleteOverlay";
import { GlobalContext } from "../../../context/GlobalWrapper";
import { Link } from "react-router-dom";
function RowDevices({ id, Name, Ref, Notes, Type, Status }) {
  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose,
    FindDevice,
    DeleteDevice,
  } = useContext(GlobalContext);
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const cancelRef = React.useRef();

  return (
    <Tr fontWeight={"medium"}>
      <Td>{Name} </Td>
      <Td>{Ref}</Td>
      <Td>{Notes && `${Notes.substring(0, 15)}...`}</Td>
      <Td>{Type}</Td>

      <Td>
        <Box
          color={"white"}
          p={1}
          rounded={"full"}
          bg={Status === "Assigned" ? "green.500" : "red.500"}
          textAlign="center"
        >
          {Status}
        </Box>
      </Td>
      <Td>
        <Box display="flex" gap={"1"}>
          <Button
            color={"blue"}
            _hover={{ color: "white", bg: "blue.500" }}
            onClick={() => {
              onDrawerOpen();
              FindDevice(id);
            }}
          >
            <AiOutlineEdit />
          </Button>
          <Button
            color={"red"}
            _hover={{ color: "white", bg: "red.500" }}
            onClick={onDeleteOpen}
          >
            <AiOutlineDelete />
          </Button>
          <Link to={`/device/${id}`}>
            <Button
              color={"green"}
              _hover={{ color: "white", bg: "green.500" }}
              onClick={() => {
                FindDevice(id);
              }}
            >
              <AiFillEye />
            </Button>
          </Link>
          <Box>
            <AlertDialog
              isOpen={isDeleteOpen}
              leastDestructiveRef={cancelRef}
              onClose={onDeleteClose}
            >
              <DelOver
                id={id}
                cancelRef={cancelRef}
                onDelete={DeleteDevice}
                onClose={onDeleteClose}
              />
            </AlertDialog>
          </Box>
        </Box>
      </Td>
    </Tr>
  );
}
export default RowDevices;
