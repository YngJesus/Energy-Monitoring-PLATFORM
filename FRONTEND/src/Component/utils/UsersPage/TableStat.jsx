import { useContext, useEffect, useState } from "react";
import {
  Stat,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import RowStat from "./RowStat";
import { GlobalContext } from "../../../context/GlobalWrapper";

function TableStat() {
  const { User_device, userData } = useContext(GlobalContext);

  useEffect(() => {
    User_device();
  }, []);

  return (
    <Stat pt={5} border={"solid 3px #6366F1"} rounded={30}>
      <TableContainer
        // rounded={10}
        // border={"solid 3px #6366F1"}
        fontSize={"sm"}
        // ml={740}
      >
        <Table variant="simple" size={"sm"}>
          <Thead>
            <Tr>
              <Th fontSize={"11"} fontWeight={800}>
                Users
              </Th>
              <Th fontSize={"11"} fontWeight={800}>
                Devices Ref
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {userData?.map(({ _id, userName, deviceRefs }) => (
              <RowStat key={_id} userName={userName} deviceRefs={deviceRefs} />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Stat>
  );
}

export default TableStat;
