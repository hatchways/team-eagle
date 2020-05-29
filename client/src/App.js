import React from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import { theme } from './themes/theme';
import { UserContext } from './components/contexts/UserContext';
import { FriendsContext } from './components/contexts/FriendsContext';

import NavBar from './components/NavBar';
import LandingPage from './pages/Landing/Landing';
import FriendsLayout from './pages/Friends/Friends';

import './App.css';

function App() {
  const user = React.useContext(UserContext);
  const friends = React.useContext(FriendsContext);

  React.useEffect(() => {
    const fetchData = async () => {
      if (!user._id) {
        await user.getCurrent();
      }

      if (user._id) {
        await friends.getFollowers(user._id, (err) => {
          throw new Error(err.message);
        });
        await friends.getFollowings(user._id, (err) => {
          throw new Error(err.message);
        });
        await friends.getSuggestions('', (err) => {
          throw new Error(err.message);
        });
      }
    };
    fetchData();
  }, [user]);

  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        {user._id ? (
          <>
            <Route path="/">
              <NavBar />
              <Dashboard />
            </Route>
            <Switch>
              <Route exact path="/friends" render={() => <FriendsLayout />} />
            </Switch>
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
