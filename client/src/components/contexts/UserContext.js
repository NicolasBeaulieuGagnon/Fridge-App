import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    if (localStorage.getItem("fridgeUser")) {
      console.log("hello");
      const fridgeUserId = localStorage.getItem("fridgeUserId");
      fetch(`/user/${fridgeUserId}`).then((res) => {
        res.json().then((data) => {
          setUser(data);
        });
      });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
