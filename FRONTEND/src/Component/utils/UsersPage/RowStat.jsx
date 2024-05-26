import { Tbody, Td, Tr } from "@chakra-ui/react";
import React from "react";

function RowStat({ userName, deviceRefs }) {
  return (
    <Tr>
      <Td>{userName}</Td>
      <Td>{deviceRefs.join(", ")}</Td>
    </Tr>
  );
}

export default RowStat;
