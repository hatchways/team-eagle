import React from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import { theme } from './themes/theme';
import { UserContext } from './components/contexts/UserContext';
import { FriendsContext } from './components/contexts/FriendsContext';

import NavBar from './components/NavBar';
import FriendsLayout from './pages/Friends/Friends';
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Landing/Login';
import Signup from './pages/Landing/Signup';

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
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />
            <Route path="*">
              <Redirect to="/login" />
            </Route>
          </Switch>
        )}
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
