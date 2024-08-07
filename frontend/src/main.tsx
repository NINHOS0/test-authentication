import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./global.css";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import "rsuite/dist/rsuite.min.css";
import { CustomProvider } from "rsuite";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider>
        <CustomProvider theme="dark">
          <App />
        </CustomProvider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
