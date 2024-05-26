import { Table, TableContainer, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import { useContext } from "react";
import { GlobalContext } from "../../../context/GlobalWrapper";
import React from "react";
import RowDevices from "./TableRowDevices";

function TableDevices() {
  const { Pages } = useContext(GlobalContext);

  return (
    <>
      <TableContainer fontSize={"sm"}>
        <Table variant="simple" size={"sm"}>
          <Thead>
            <Tr>
              <Th fontSize={"11"} fontWeight={800}>
                Name
              </Th>
              <Th fontSize={"11"} fontWeight={800}>
                Ref
              </Th>
              <Th fontSize={"11"} fontWeight={800}>
                Notes
              </Th>
              <Th fontSize={"11"} fontWeight={800}>
                Type
              </Th>
              <Th fontSize={"11"} fontWeight={800}>
                Status
              </Th>
              <Th fontSize={"11"} fontWeight={800}>
                Action
              </Th>
            </Tr>
          </Thead>
          <Tbody bg={"white"}>
            {Pages?.map(({ _id, Name, Ref, Notes, Type, Status }) => {
              return (
                <RowDevices
                  id={_id}
                  Name={Name}
                  Ref={Ref}
                  Notes={Notes}
                  Type={Type}
                  Status={Status}
                />
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}

export default TableDevices;
