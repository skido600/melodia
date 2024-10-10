import React, { createContext, useState } from "react";

export const ToggleContext = createContext();

// Create a provider component
export const ToggleProvider = ({ children }) => {
  const [toggle, setToggle] = useState(false);

  const HandleToggle = () => {
    if (window.innerWidth < 730) {
      setToggle(!toggle);
    }
  };

  return (
    <ToggleContext.Provider value={{ toggle, HandleToggle }}>
      {children}
    </ToggleContext.Provider>
  );
};
