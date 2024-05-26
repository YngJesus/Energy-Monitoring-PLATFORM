import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
} from "@chakra-ui/react";
import React from "react";

function SelectGroup({
  onChangeHandler,
  name,
  errors,
  type,
  value,
  Option1,
  Option2,
}) {
  return (
    <FormControl isInvalid={errors}>
      <FormLabel>{name}</FormLabel>
      <Select
        size={"md"}
        _hover={{ border: "1px solid #0040A2" }}
        border={"1px solid #7778E2"}
        onChange={onChangeHandler}
        name={name}
        value={value}
        placeholder={name}
      >
        <option>{Option1}</option>
        <option>{Option2}</option>
      </Select>

      {errors &&
        errors?.map((err) => {
          return <FormErrorMessage> {err} </FormErrorMessage>;
        })}
    </FormControl>
  );
}

export default SelectGroup;
