import { Box, Button, FormControl, Input, Text } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import {
  AiFillInteraction,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlinePlus,
  AiOutlineSearch,
} from "react-icons/ai";
import Tables from "../utils/UsersPage/Table";
import DrawerUsers from "../utils/UsersPage/Drawer";
import { GlobalContext } from "../../context/GlobalWrapper";

function MainUsers() {
  const {
    fetchUsers,
    Search,
    onOpen,
    totalPages,
    currentPage,
    itemsPerPage,
    currentItems,
    setCurrentPage,
    getCus,
  } = useContext(GlobalContext);
  const [query, setQuery] = useState("");
  useEffect(() => {
    fetchUsers();
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    getCus();
  }, []);

  const SearchHandler = () => {
    if (query === "") {
      return fetchUsers();
    }
    Search(query);
  };
  const onchangeHandler = (e) => {
    setQuery(e.target.value);
  };
  const Refresh = () => {
    fetchUsers();
    setQuery("");
    setCurrentPage(1);
  };

  return (
    <>
      <Box mt={5}>
        <Box>
          <Box m={5} display={"flex"} justifyContent={"space-between"}>
            <Text fontWeight="bold" fontSize="4xl" color={"#1D4044"}>
              Users
            </Text>
            <Button
              colorScheme={"white"}
              _hover={{ bg: "#474bed" }}
              bg="#6366F1"
              leftIcon={<AiOutlinePlus size={"20px"} />}
              p={3}
              onClick={onOpen}
            >
              Add User
            </Button>
          </Box>
          <Box m={2}>
            <FormControl
              display={"flex"}
              alignItems={"center"}
              gap={1}
              p={3}
              boxShadow={"base"}
              rounded={"md"}
            >
              <Input
                type="text"
                onChange={onchangeHandler}
                maxW={"30%"}
                placeholder="Search users..."
              />
              <Button
                bg="#6366F1"
                colorScheme={"white"}
                _hover={{ bg: "#474bed" }}
                onClick={() => SearchHandler()}
              >
                <AiOutlineSearch />
              </Button>
              <Button
                bg="#6366F1"
                colorScheme={"white"}
                _hover={{ bg: "#474bed" }}
                onClick={() => Refresh()}
              >
                <AiFillInteraction />
              </Button>
            </FormControl>
          </Box>
        </Box>
        <Box m={5} p={2} rounded={"lg"} boxShadow={"base"} bgColor={"#EDF2F7"}>
          <Tables />
        </Box>
        <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
          {currentItems.map((item) => (
            <div key={item.id}>
              <p>{item.title}</p>
              <p>{item.description}</p>
            </div>
          ))}

          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            bg={"#1C2536"}
            mb={1}
            rounded={8}
          >
            <Button
              onClick={() =>
                setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
              }
              disabled={currentPage === 1}
              m={2}
              size={"sm"}
            >
              <AiOutlineArrowLeft size={15} />
            </Button>
            <Text
              color={"white"}
            >{`Page ${currentPage} of ${totalPages}`}</Text>
            <Button
              onClick={() =>
                setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              m={2}
              size={"sm"}
            >
              <AiOutlineArrowRight size={15} />
            </Button>
          </Box>
        </Box>
        <DrawerUsers />
      </Box>
    </>
  );
}

export default MainUsers;
