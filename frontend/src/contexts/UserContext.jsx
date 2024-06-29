import React, { useState, createContext } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <UserContext.Provider
      value={{ username, password, setUsername, setPassword }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider as default };
