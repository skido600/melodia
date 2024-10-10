import React, { createContext, useState, useEffect } from "react";

export const ToggleContext = createContext();

// Create a provider component
export const ToggleProvider = ({ children }) => {
  const [toggle, setToggle] = useState(false);

  const HandleToggle = () => {
    setToggle((prev) => !prev); // Toggle state without checking window size
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 730) {
        setToggle(false); // Close the toggle if window width is greater than or equal to 730
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize); // Clean up the event listener
    };
  }, []);

  return (
    <ToggleContext.Provider value={{ toggle, HandleToggle }}>
      {children}
    </ToggleContext.Provider>
  );
};
