import { createRoot } from "react-dom/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import App from "./App";
import { inputTheme } from "./themes/Input";

const theme = extendTheme({
  components: {
    Input: inputTheme,
  }
});

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>
);