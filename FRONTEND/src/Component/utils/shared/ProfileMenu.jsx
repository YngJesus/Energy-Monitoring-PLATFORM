import {
  Avatar,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import React from "react";
import { AiOutlineMail } from "react-icons/ai";

function ProfileMenu() {
  return (
    <Menu>
      <MenuButton colorScheme="pink">
        {/* <Avatar
          name="Dan Abrahmov"
          mr={2}
          ml={1}
          size="md"
          cursor={"pointer"}
        /> */}
      </MenuButton>
      <MenuList>
        <MenuGroup title="Admin">
          <MenuItem>JD Baha</MenuItem>
          <MenuItem>
            <AiOutlineMail /> Baha@gmail.com
          </MenuItem>
        </MenuGroup>
        <MenuDivider />
        <MenuGroup title="Account">
          <MenuItem>Settings</MenuItem>
          <MenuItem>Profile</MenuItem>
          <MenuItem>Logout</MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  );
}

export default ProfileMenu;
