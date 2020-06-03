import React, { useState } from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import { theme } from './themes/theme';
import { UserContext } from './components/contexts/UserContext';
import { FriendsContext } from './components/contexts/FriendsContext';

import NavBar from './components/NavBar';
import FriendsLayout from './pages/Friends/Friends';
import Dashboard from './pages/Dashboard/Dashboard';
import Loading from './components/Loading';
import Login from './pages/Landing/Login';
import Signup from './pages/Landing/Signup';

import './App.css';

function App() {
  const user = React.useContext(UserContext);
  const friends = React.useContext(FriendsContext);
  const [userLoading, setUserLoading] = useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      if (!user._id) {
        setUserLoading(true);
        await user.getCurrent((err) => {
          setUserLoading(false);
        });
      } else {
        setUserLoading(false);
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
