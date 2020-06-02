import React, { useState } from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import { theme } from './themes/theme';
import { UserContext } from './components/contexts/UserContext';
import { FriendsContext } from './components/contexts/FriendsContext';

import NavBar from './components/NavBar';
import LandingPage from './pages/Landing/Landing';
import FriendsLayout from './pages/Friends/Friends';
import Dashboard from './pages/Dashboard/Dashboard';

import './App.css';

function App() {
  const user = React.useContext(UserContext);
  const friends = React.useContext(FriendsContext);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      if (!user._id) {
        // if user is not here, show loading, and start fetch
        setLoading(true);
        await user.getCurrent((err) => {
          // if user is not found, don't show loading
          setLoading(false);
        });
      }

      if (user._id) {
        setLoading(false);
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

  if (loading) {
    return (
      <MuiThemeProvider theme={theme}>
        {/* Loading component here */}
      </MuiThemeProvider>
    );
  }

  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        {user._id ? (
          <>
            <NavBar />
            <Switch>
              <Route exact path="/friends" component={FriendsLayout} />
              <Route exact path="/" component={Dashboard} />
              <Route path="*">
                <Redirect to="/" />
              </Route>
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
