import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import moment from "moment/moment";
import "moment/locale/tr";

import { theme } from "./styles/mui/theme";
import ApplicationRoute from "./ApplicationRoute";
import { AuthProvider } from "./context/AuthProvider";
import "./styles/sass/main.scss";
import { HelmetProvider } from "react-helmet-async";

function App() {
  moment.locale("tr");
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <HelmetProvider>
          <AuthProvider>
            <ApplicationRoute />
          </AuthProvider>
        </HelmetProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
