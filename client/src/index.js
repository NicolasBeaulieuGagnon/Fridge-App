import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { SearchedRecipesProvider } from "./components/contexts/SearchedRecipesContext";
import { UserProvider } from "./components/contexts/UserContext";

ReactDOM.render(
  <UserProvider>
    <SearchedRecipesProvider>
      <App />
    </SearchedRecipesProvider>
  </UserProvider>,

  document.getElementById("root")
);
