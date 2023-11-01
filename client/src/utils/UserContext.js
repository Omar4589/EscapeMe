import React, { createContext, useContext, useEffect, useState } from "react";
import { ME_QUERY } from "./queries";

const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const value = { isDarkMode, setIsDarkMode };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
