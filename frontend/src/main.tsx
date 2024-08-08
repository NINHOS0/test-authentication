import "./global.css";
import "rsuite/dist/rsuite.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { AuthProvider } from "./contexts/useAuth.tsx";
import { BrowserRouter } from "react-router-dom";
import { CustomProvider } from "rsuite";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CustomProvider theme="dark">
          <App />
        </CustomProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
