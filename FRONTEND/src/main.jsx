import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Wrapper from "./context/GlobalWrapper.jsx";
import { ChakraProvider } from "@chakra-ui/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Wrapper>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </Wrapper>
);
