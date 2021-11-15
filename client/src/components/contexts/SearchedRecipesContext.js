import React, { createContext, useState } from "react";

export const SearchedRecipesContext = createContext(null);

export const SearchedRecipesProvider = ({ children }) => {
  const [recipesArray, setRecipesArray] = useState([]);

  return (
    <SearchedRecipesContext.Provider value={{ recipesArray, setRecipesArray }}>
      {children}
    </SearchedRecipesContext.Provider>
  );
};
