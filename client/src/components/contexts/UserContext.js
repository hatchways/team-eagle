import React from 'react';
import socketIOClient from 'socket.io-client';

// This is what each component should import
export const UserContext = React.createContext();

// This should be imported only by index.js
export const UserContextProvider = ({ children }) => {
  const [state, setState] = React.useState({});
  const socket = socketIOClient('http://localhost:3001');

  function getCurrent(callback) {
    return fetch('/users/current', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      res
        .json()
        .then((data) => {
          if (res.status === 200) {
            setState({
              ...state,
              ...data,
            });
            return data;
          } else if (callback) {
            callback(res.status);
          }
        })
        .catch(() => {
          callback(res.status);
        });
    });
  }

  function signup(payload, callback) {
    return fetch('/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(payload),
    }).then((res) => {
      res.json().then((data) => {
        if (res.status === 200) {
          setState({
            ...state,
            ...data,
          });
        } else {
          callback({ ...data, status: res.status });
        }
      });
    });
  }

  function login(payload, callback) {
    return fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(payload),
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((user) => {
          setState({ ...state, ...user });
        });
      } else {
        callback(res.status);
      }
    });
  }

  function logout(callback) {
    socket.emit('disconnect');
    return fetch('/auth/logout', {
      method: 'DELETE',
    }).then((res) => {
      if (res.status === 200) {
        setState({});
      } else {
        callback(res.status);
      }
    });
  }

  return (
    <UserContext.Provider
      value={{ ...state, getCurrent, signup, login, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};
