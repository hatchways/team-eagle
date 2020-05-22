import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { theme } from "./themes/theme";

import UserContext from "./components/UserContext";
import NavBar from "./components/NavBar";
import LandingPage from "./pages/Landing/Landing";

import "./App.css";

// Temporary
const isLoggedIn = false;

function ContextProvider({ children }) {
  const [state, setState] = React.useState({
    // Placeholders
    name: "Caroline",
    email: "email@gmail.com",
    image:
      "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?cs=srgb&dl=closeup-photo-of-woman-with-brown-coat-and-gray-top-733872.jpg&fm=jpg",
  });

  function setUser(user) {
    setState(user);
  }

  return (
    <UserContext.Provider value={{ ...state, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        {isLoggedIn ? (
          <>
            <Route path="/">
              <ContextProvider>
                <NavBar />
              </ContextProvider>
            </Route>
          </>
        ) : (
          <Switch>
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
            <Route path="*">
              <Redirect to="/signup" />
            </Route>
          </Switch>
        )}
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
