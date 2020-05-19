import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";

import { theme } from "./themes/theme";

import LandingPage from "./pages/Landing/Landing";

import "./App.css";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Route
          exact
          path="/signup"
          render={() => <LandingPage form="signup" />}
        />
        <Route
          exact
          path="/login"
          render={() => <LandingPage form="login" />}
        />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
