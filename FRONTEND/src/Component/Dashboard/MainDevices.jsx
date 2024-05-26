import { Box, Button, FormControl, Input, Text } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import {
  AiFillInteraction,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlinePlus,
  AiOutlineSearch,
} from "react-icons/ai";
import TableDevices from "../utils/DevicesPage/TableDevices";
import { GlobalContext } from "../../context/GlobalWrapper";
import DrawerDevice from "../utils/DevicesPage/DrawerDevice";

function MainDevices() {
  const {
    getDevices,
    SearchDevice,
    onOpen,
    totalPagesD,
    currentPage,
    itemsPerPage,
    currentItemsD,
    setCurrentPage,
    fetchDevices,
  } = useContext(GlobalContext);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchDevices();
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    getDevices();
  }, []);

  const SearchHandler = () => {
    if (query === "") {
      return fetchDevices();
    }
    SearchDevice(query);
  };
  const onchangeHandler = (e) => {
    setQuery(e.target.value);
  };
  const Refresh = () => {
    fetchDevices();
    setQuery("");
    setCurrentPage(1);
  };

  return (
    <>
      <Box mt={5}>
        <Box>
          <Box m={5} display={"flex"} justifyContent={"space-between"}>
            <Text fontWeight="bold" fontSize="4xl" color={"#1D4044"}>
              Devices
            </Text>
            <Button
              colorScheme={"white"}
              _hover={{ bg: "#474bed" }}
              bg="#6366F1"
              leftIcon={<AiOutlinePlus size={"20px"} />}
              p={3}
              onClick={onOpen}
            >
              Add Device
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
                placeholder="Search Devices..."
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
          <TableDevices />
        </Box>
        <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
          {currentItemsD.map((item) => (
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
            >{`Page ${currentPage} of ${totalPagesD}`}</Text>
            <Button
              onClick={() =>
                setCurrentPage((prevPage) =>
                  Math.min(prevPage + 1, totalPagesD)
                )
              }
              disabled={currentPage === totalPagesD}
              m={2}
              size={"sm"}
            >
              <AiOutlineArrowRight size={15} />
            </Button>
          </Box>
        </Box>
        <DrawerDevice />
      </Box>
    </>
  );
}

export default MainDevices;
