import React from "react";

// This is what each component should import
export const UserContext = React.createContext();

// This should be imported only by index.js
export const ContextProvider = ({ children }) => {
  const [state, setState] = React.useState({
    // Placeholders
    // name: "Caroline",
    // email: "email@gmail.com",
    // image:
    //   "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?cs=srgb&dl=closeup-photo-of-woman-with-brown-coat-and-gray-top-733872.jpg&fm=jpg",
  });

  function setUser(user) {
    console.log("setting user...");
    console.log(user);
    setState(user);
  }

  function logout() {
    fetch("/auth/logout", {
      method: "DELETE",
    })
      .then(function (res) {
        setState({});
      })
      .catch(function (err) {
        // Add message to user here!
        throw err;
      });
  }

  return (
    <UserContext.Provider value={{ ...state, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};
