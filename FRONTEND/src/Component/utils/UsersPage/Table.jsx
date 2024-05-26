import { Table, TableContainer, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import Row from "./TableRow";
import { useContext } from "react";
import { GlobalContext } from "../../../context/GlobalWrapper";

function Tables() {
  const { users } = useContext(GlobalContext);

  return (
    <>
      <TableContainer fontSize={"sm"}>
        <Table variant="simple" size={"sm"}>
          <Thead>
            <Tr>
              <Th fontSize={"11"} fontWeight={800}>
                Avatar
              </Th>
              <Th fontSize={"11"} fontWeight={800}>
                FirstName
              </Th>
              <Th fontSize={"11"} fontWeight={800}>
                LastName
              </Th>
              <Th fontSize={"11"} fontWeight={800}>
                Email
              </Th>
              <Th fontSize={"11"} fontWeight={800}>
                Gender
              </Th>
              <Th fontSize={"11"} fontWeight={800} isNumeric>
                Number
              </Th>
              <Th fontSize={"11"} fontWeight={800}>
                Action
              </Th>
            </Tr>
          </Thead>
          <Tbody bg={"white"}>
            {users?.map(
              ({ _id, firstName, lastName, Email, Gender, Number }) => {
                return (
                  <Row
                    id={_id}
                    firstName={firstName}
                    lastName={lastName}
                    Email={Email}
                    Gender={Gender}
                    Number={Number}
                  />
                );
              }
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}

export default Tables;
