import React from 'react';
import { UserContext } from './UserContext';

// This is what each component should import
export const FriendsContext = React.createContext();

// This should be imported only by index.js
export const FriendsContextProvider = ({ children }) => {
  const [state, setState] = React.useState({
    followers: [],
    followings: [],
    suggestions: [],
  });

  debugger;

  const user = React.useContext(UserContext);

  function getFollowers(targetId, callback) {
    return fetch(`/users/${targetId}/friends/followers`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      referrerPolicy: 'no-referrer',
    }).then((res) => {
      res.json().then((data) => {
        if (res.status === 200) {
          setState({ ...state, followers: data });
        } else {
          callback({ ...data, status: res.status });
        }
      });
    });
  }

  function getFollowings(targetId, callback) {
    return fetch(`/users/${targetId}/friends/followings`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      referrerPolicy: 'no-referrer',
    }).then((res) => {
      res.json().then((data) => {
        if (res.status === 200) {
          setState({ ...state, followings: data });
        } else {
          callback({ ...data, status: res.status });
        }
      });
    });
  }

  // [private]
  function getSuggestions(callback) {
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
          setState({ ...state, suggestions: data });
        } else {
          callback({ ...data, status: res.status });
        }
      });
    });
  }

  // [private]
  // updates followings when called
  function follow(targetId, callback) {
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
          getFollowings(user._id, (err) => {
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
  function unfollow(targetId, callback) {
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
          getFollowings(user._id, (err) => {
            throw err;
          });
        } else {
          callback({ ...data, status: res.status });
        }
      });
    });
  }

  return (
    <FriendsContext.Provider
      value={{
        ...state,
        getFollowers,
        getFollowings,
        getSuggestions,
        follow,
        unfollow,
      }}
    >
      {children}
    </FriendsContext.Provider>
  );
};
