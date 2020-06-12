import React from 'react';
import { getUserPolls } from 'util/api_util';

// This is what each component should import
export const PollsContext = React.createContext();

// This should be imported only by index.js
export const PollsContextProvider = ({ children }) => {
  const [polls, setPolls] = React.useState([]);

  React.useEffect(() => {
    updatePolls();
  }, []);

  function updatePolls() {
    getUserPolls()
      .then((polls) => {
        setPolls(polls);
      })
      .catch((err) => console.log(err));
  }

  function updateVotablePolls(polls) {
    setPolls(polls);
  }

  return (
    <PollsContext.Provider value={{ polls, updatePolls, updateVotablePolls }}>
      {children}
    </PollsContext.Provider>
  );
};
