// import React, { useContext, useEffect } from "react";
// import {
//   Box,
//   Text,
//   Divider,
//   VStack,
//   useColorModeValue,
//   Icon,
//   Heading,
//   Table,
//   Thead,
//   Tr,
//   Th,
//   Tbody,
//   Td,
// } from "@chakra-ui/react";
// import { GlobalContext } from "../../context/GlobalWrapper";
// import { EmailIcon, PhoneIcon, InfoOutlineIcon } from "@chakra-ui/icons";
// import { FaMale, FaFemale } from "react-icons/fa";
// import styles from "../../styles/LoginPage.module.css";
// import AdminTotalEnergyChart from "../utils/Admin/AdminTotalEnergyChart";
// import AdminCostChart from "../utils/Admin/AdminCostChart";
// import AdminPeakUsage from "../utils/Admin/AdminPeak";

// function OneUser({ userId }) {
//   const { user, FindOne } = useContext(GlobalContext);

//   const memoizedFindOne = React.useMemo(() => {
//     const cache = {};
//     return (userId) => {
//       if (cache[userId]) {
//         return cache[userId];
//       }
//       const result = FindOne(userId);
//       cache[userId] = result;
//       return result;
//     };
//   }, []); // Empty dependency array to prevent memo itself from re-running

//   useEffect(() => {
//     console.log("OneUser userId:", userId);
//     const user = memoizedFindOne(userId);
//     // Use the retrieved user data here
//   }, [userId, memoizedFindOne]);

//   const cardBg = useColorModeValue("purple.100", "purple.900");
//   const cardBorder = useColorModeValue("black", "teal.700");

//   const genderIcon = user?.Gender === "male" ? FaMale : FaFemale;

//   return (
//     <>
//       <Box
//         p={5}
//         bg={cardBg}
//         borderWidth="1px"
//         borderColor={cardBorder}
//         borderRadius="lg"
//         shadow="md"
//         maxW="sm"
//         mx={2}
//         my={6}
//         className={styles.login}
//       >
//         <Text fontSize="lg" color={"black"} fontWeight="bold" mb={4}>
//           <Icon as={InfoOutlineIcon} mr={2} />
//           User Information:
//         </Text>
//         <Divider mb={4} />
//         <VStack spacing={4} align="stretch">
//           <Text fontSize="md">
//             <Box mr={2} as="span" color={"black"}>
//               <Icon as={EmailIcon} mr={2} />
//               FirstName:
//             </Box>
//             {user?.firstName}
//           </Text>
//           <Text fontSize="md">
//             <Box mr={2} as="span" color={"black"}>
//               <Icon as={PhoneIcon} mr={2} />
//               LastName:
//             </Box>
//             {user?.lastName}
//           </Text>
//           <Text fontSize="md">
//             <Box mr={2} as="span" color={"black"}>
//               <Icon as={EmailIcon} mr={2} />
//               Email:
//             </Box>
//             {user?.Email}
//           </Text>
//           <Text fontSize="md">
//             <Box mr={2} as="span" color={"black"}>
//               <Icon as={genderIcon} mr={2} />
//               Gender:
//             </Box>
//             {user?.Gender}
//           </Text>
//           <Text fontSize="md">
//             <Box mr={2} as="span" color={"black"}>
//               <Icon as={PhoneIcon} mr={2} />
//               Number:
//             </Box>
//             {user?.Number}
//           </Text>
//         </VStack>
//         <Box>
//           {user && user.linkedDevice && (
//             <>
//               {user.linkedDevice.map((device, index) => (
//                 <Box key={index} bgColor="red" m={2}>
//                   {device}
//                 </Box>
//               ))}
//               <AdminTotalEnergyChart linkedDevice={user?.linkedDevice} />
//               <AdminCostChart linkedDevice={user?.linkedDevice} />
//               <AdminPeakUsage linkedDevice={user?.linkedDevice} />
//             </>
//           )}
//         </Box>
//       </Box>
//     </>
//   );
// }

// export default OneUser;
import React, { useContext, useEffect } from "react";
import {
  Box,
  Text,
  Divider,
  VStack,
  useColorModeValue,
  Icon,
  Heading,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";
import { GlobalContext } from "../../context/GlobalWrapper";
import { EmailIcon, PhoneIcon, InfoOutlineIcon } from "@chakra-ui/icons";
import { FaMale, FaFemale } from "react-icons/fa";
import styles from "../../styles/LoginPage.module.css";
import AdminTotalEnergyChart from "../utils/Admin/AdminTotalEnergyChart";
import AdminCostChart from "../utils/Admin/AdminCostChart";
import AdminPeakUsage from "../utils/Admin/AdminPeak";

function OneUser({ userId }) {
  const { user, FindOne } = useContext(GlobalContext);

  const memoizedFindOne = React.useMemo(() => {
    const cache = {};
    return (userId) => {
      if (cache[userId]) {
        return cache[userId];
      }
      const result = FindOne(userId);
      cache[userId] = result;
      return result;
    };
  }, []); // Empty dependency array to prevent memo itself from re-running

  useEffect(() => {
    console.log("OneUser userId:", userId);
    const user = memoizedFindOne(userId);
    // Use the retrieved user data here
  }, [userId, memoizedFindOne]);

  const cardBg = useColorModeValue("purple.100", "purple.900");
  const cardBorder = useColorModeValue("black", "teal.700");

  const genderIcon = user?.Gender === "male" ? FaMale : FaFemale;

  return (
    <>
      <Box
        p={5}
        bg={cardBg}
        borderWidth="1px"
        borderColor={cardBorder}
        borderRadius="lg"
        shadow="md"
        maxW="sm"
        mx={2}
        my={6}
        className={styles.login}
      >
        <Text fontSize="lg" color={"black"} fontWeight="bold" mb={4}>
          <Icon as={InfoOutlineIcon} mr={2} />
          User Information:
        </Text>
        <Divider mb={4} />
        <VStack spacing={4} align="stretch">
          <Text fontSize="md">
            <Box mr={2} as="span" color={"black"}>
              <Icon as={EmailIcon} mr={2} />
              FirstName:
            </Box>
            {user?.firstName}
          </Text>
          <Text fontSize="md">
            <Box mr={2} as="span" color={"black"}>
              <Icon as={PhoneIcon} mr={2} />
              LastName:
            </Box>
            {user?.lastName}
          </Text>
          <Text fontSize="md">
            <Box mr={2} as="span" color={"black"}>
              <Icon as={EmailIcon} mr={2} />
              Email:
            </Box>
            {user?.Email}
          </Text>
          <Text fontSize="md">
            <Box mr={2} as="span" color={"black"}>
              <Icon as={genderIcon} mr={2} />
              Gender:
            </Box>
            {user?.Gender}
          </Text>
          <Text fontSize="md">
            <Box mr={2} as="span" color={"black"}>
              <Icon as={PhoneIcon} mr={2} />
              Number:
            </Box>
            {user?.Number}
          </Text>
        </VStack>
        <Box>
          {user && user.linkedDevice && user.linkedDevice.length > 0 && (
            <>
              {user.linkedDevice.map((device, index) => (
                <Box key={index} bgColor="red" m={2}>
                  {device}
                </Box>
              ))}
              <AdminTotalEnergyChart linkedDevice={user?.linkedDevice} />
              <AdminCostChart linkedDevice={user?.linkedDevice} />
              <AdminPeakUsage linkedDevice={user?.linkedDevice} />
            </>
          )}
        </Box>
      </Box>
    </>
  );
}

export default OneUser;
