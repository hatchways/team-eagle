import React from 'react';

// This is what each component should import
export const PollContext = React.createContext();

// This should be imported only by index.js
export const PollContextProvider = ({ children }) => {
  const [state, setState] = React.useState({
    poll: {},
    votes: [],
  });

  function getPoll(pollId, callback) {
    fetch(`/polls/${pollId}`, {
      method: 'GET',
    }).then((res) => {
      res.json().then((data) => {
        if (res.status === 200) {
          setState((prevState) => {
            return { ...prevState };
          });
        } else {
          callback({ ...data, status: res.status });
        }
      });
    });
  }

  function vote(pollId, imageIdx, callback) {
    fetch(`/polls/${pollId}/${imageIdx}/vote`, {
      method: 'POST',
    }).then((res) => {
      res.json().then((data) => {
        if (res.status === 200) {
          setState((prevState) => {
            return { ...prevState };
          });
        } else {
          callback({ ...data, status: res.status });
        }
      });
    });
  }

  function unvote(pollId, imageIdx, callback) {
    fetch(`/polls/${pollId}/${imageIdx}/vote`, {
      method: 'DELETE',
    }).then((res) => {
      res.json().then((data) => {
        if (res.status === 200) {
          setState((prevState) => {
            return { ...prevState };
          });
        } else {
          callback({ ...data, status: res.status });
        }
      });
    });
  }

  return (
    <PollContext.Provider
      value={{
        ...state,
        getPoll,
        vote,
        unvote,
      }}
    >
      {children}
    </PollContext.Provider>
  );
};
