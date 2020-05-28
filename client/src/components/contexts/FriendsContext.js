import React from 'react';
import { UserContext } from './UserContext';

// This is what each component should import
export const FriendsContext = React.createContext();

// This should be imported only by index.js
export const ContextProvider = ({ children }) => {
  const [state, setState] = React.useState({
    followers: [],
    followings: [],
    suggestions: [],
  });

  function followers(targetId, callback) {
    return fetch(`/users/${targetId}/friends/followers`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      referrerPolicy: 'no-referrer',
    }).then((res) => {
      res.json().then((data) => {
        if (res.status === 200) {
          const newState = Object.assign(state, { followers: data });
          setState({ newState });
        } else {
          callback({ ...data, status: res.status });
        }
      });
    });
  }

  function followings(targetId, callback) {
    return fetch(`/users/${targetId}/friends/followings`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      referrerPolicy: 'no-referrer',
    }).then((res) => {
      res.json().then((data) => {
        if (res.status === 200) {
          const newState = Object.assign(state, { followings: data });
          setState({ newState });
        } else {
          callback({ ...data, status: res.status });
        }
      });
    });
  }

  // [private]
  function suggestions(callback) {
    const user = React.useContext(UserContext);
    if (!user._id) throw 'user is not logged in';

    return fetch(`/users/${user._id}/friends/suggestions`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      referrerPolicy: 'no-referrer',
    }).then((res) => {
      res.json().then((data) => {
        if (res.status === 200) {
          const newState = Object.assign(state, { suggestions: data });
          setState({ newState });
        } else {
          callback({ ...data, status: res.status });
        }
      });
    });
  }

  // [private]
  // updates followings when called
  function follow(targetId, callback) {
    const user = React.useContext(UserContext);
    if (!user._id) throw 'user is not logged in';

    return fetch(`/users/${user._id}/friends/${targetId}/follow`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      referrerPolicy: 'no-referrer',
    }).then((res) => {
      res.json().then((data) => {
        if (res.status === 200) {
          followings(user._id, (err) => {
            throw err;
          });
        } else {
          callback({ ...data, status: res.status });
        }
      });
    });
  }

  // [private]
  // updates followings when called
  function unfollow(callback) {
    const user = React.useContext(UserContext);
    if (!user._id) throw 'user is not logged in';

    return fetch(`/users/${user._id}/friends/${targetId}/follow`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      referrerPolicy: 'no-referrer',
    }).then((res) => {
      res.json().then((data) => {
        if (res.status === 200) {
          followings(user._id, (err) => {
            throw err;
          });
        } else {
          callback({ ...data, status: res.status });
        }
      });
    });
  }

  return (
    <UserContext.Provider
      value={{ ...state, followers, followings, suggestions, follow, unfollow }}
    >
      {children}
    </UserContext.Provider>
  );
};
