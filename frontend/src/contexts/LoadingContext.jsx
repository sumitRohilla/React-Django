import React, { useState, createContext } from "react";

const LoadingContext = createContext();

const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState();

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export { LoadingContext, LoadingProvider as default };
