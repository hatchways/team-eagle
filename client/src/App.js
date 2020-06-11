import React, { useState } from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import { theme } from 'themes/theme';
import { UserContext } from 'components/contexts/UserContext';
import { FriendsContext } from 'components/contexts/FriendsContext';
import { PollContextProvider } from './components/contexts/PollContext';
import { PollsContextProvider } from './components/contexts/PollsContext';

import NavBar from './components/NavBar';
import NavDrawer from './components/NavDrawer';
import Loading from './components/Loading';
import LandingPage from './pages/Landing/Landing';
import FriendsLayout from './pages/Friends/Friends';
import Dashboard from './pages/Dashboard/Dashboard';
import PollHome from './pages/Polls/PollHome';
import Poll from './pages/Poll/Poll';
import socketIOClient from 'socket.io-client';

import './App.css';

function App() {
  const user = React.useContext(UserContext);
  const friends = React.useContext(FriendsContext);
  const [userLoading, setUserLoading] = useState(true);

  React.useEffect(() => {
    const socket = socketIOClient('http://localhost:3001');
    const fetchData = async () => {
      if (!user._id) {
        setUserLoading(true);
        await user.getCurrent((err) => {
          setUserLoading(false);
        });
      } else {
        setUserLoading(false);
        socket.emit('userActive', { userId: user._id });
        socket.on('makeActive', async () => {
          fetch('/users/active').then((response) => {});
        });
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

  if (userLoading) {
    return (
      <MuiThemeProvider theme={theme}>
        <Loading />
      </MuiThemeProvider>
    );
  }

  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        {user._id ? (
          <PollsContextProvider>
            <NavBar />
            <Switch>
              <Route exact path="/polls/:pollId">
                <PollContextProvider>
                  <Poll />
                </PollContextProvider>
              </Route>
              <Route exact path="/friends" component={FriendsLayout} />
              <Route exact path="/polls" component={PollHome} />
              <Route exact path="/" component={Dashboard} />
              <Route path="*">
                <Redirect to="/" />
              </Route>
            </Switch>
          </PollsContextProvider>
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
