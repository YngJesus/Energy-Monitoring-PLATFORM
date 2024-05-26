import {
  AlertDialog,
  Avatar,
  Box,
  Button,
  Modal,
  Td,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";

import React, { useContext } from "react";
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiFillPlusCircle,
  AiFillEye,
} from "react-icons/ai";
import DelOver from "../shared/DeleteOverlay";
import { GlobalContext } from "../../../context/GlobalWrapper";
import AssignDevice from "../DevicesPage/AssignDevice";
import { Link, useNavigate } from "react-router-dom";

function Row({ id, firstName, lastName, Email, Number, Gender }) {
  const { onOpen: onDrawerOpen, FindOne, Delete } = useContext(GlobalContext);
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  const navigate = useNavigate();

  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  const cancelRef = React.useRef();
  return (
    <Tr fontWeight={"medium"}>
      <Td>
        <Avatar name={firstName} size={"sm"} />
      </Td>
      <Td>{firstName} </Td>
      <Td>{lastName}</Td>
      <Td>{Email}</Td>
      <Td>{Gender}</Td>
      <Td isNumeric>{Number}</Td>
      <Td>
        <Box display="flex" gap={"1"}>
          <Button
            color={"blue"}
            _hover={{ color: "white", bg: "blue.500" }}
            onClick={() => {
              onDrawerOpen();
              FindOne(id);
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
          <Button
            color={"green.600"}
            _hover={{ color: "white", bg: "green.500" }}
            onClick={onModalOpen}
          >
            <AiFillPlusCircle size={19} />
          </Button>
          {/* <Link to={`/user/${id}`} > */}
          <Button
            color={"black"}
            _hover={{ color: "white", bg: "black" }}
            onClick={() => {
              FindOne(id);
              console.log(firstName);
              navigate(`/user/${id}`);
              window.location.reload();
            }}
          >
            <AiFillEye />
          </Button>
          {/* </Link> */}
          <Box>
            <AlertDialog
              isOpen={isDeleteOpen}
              leastDestructiveRef={cancelRef}
              onClose={onDeleteClose}
            >
              <DelOver
                id={id}
                cancelRef={cancelRef}
                onDelete={Delete}
                onClose={onDeleteClose}
              />
            </AlertDialog>
            <Modal isOpen={isModalOpen} onClose={onModalClose}>
              <AssignDevice id={id} onClose={onModalClose} />
            </Modal>
          </Box>
        </Box>
      </Td>
    </Tr>
  );
}

export default Row;
