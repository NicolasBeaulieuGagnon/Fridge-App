import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signup from "./pages/SignUp";

import { GlobalStyle } from "./components/GlobalStyle";
import Fridge from "./pages/Fridge";
import Login from "./pages/Login";
import Recipe from "./pages/Recipe";
import Footer from "./pages/Footer";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/fridge">
            <Fridge />
          </Route>
          <Route exact path="/recipe/:recipeId">
            <Recipe />
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </>
  );
};

export default App;
