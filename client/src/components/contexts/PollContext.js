import React from 'react';

// This is what each component should import
export const PollContext = React.createContext();

// This should be imported only by index.js
export const PollContextProvider = ({ children }) => {
  const [state, setState] = React.useState({
    poll: {},
    votes: [],
  });

  function setPollState(newState) {
    setState((prevState) => {
      return { ...prevState, ...newState };
    });
  }

  return (
    <PollContext.Provider
      value={{
        ...state,
        setPollState,
      }}
    >
      {children}
    </PollContext.Provider>
  );
};
