import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";

function InputsGroup({ onChangeHandler, name, errors, type, value }) {
  return (
    <FormControl isInvalid={errors}>
      <FormLabel>{name}</FormLabel>
      <Input
        size={"md"}
        _hover={{ border: "1px solid #0040A2" }}
        border={"1px solid #7778E2"}
        rounded={20}
        type={type}
        onChange={onChangeHandler}
        name={name}
        value={value}
      />
      {errors &&
        errors?.map((err) => {
          return <FormErrorMessage> {err} </FormErrorMessage>;
        })}
    </FormControl>
  );
}

export default InputsGroup;
