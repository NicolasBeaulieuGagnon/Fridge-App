import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signup from "./pages/SignUp";
import styled from "styled-components";

import { GlobalStyle } from "./components/GlobalStyle";
import Fridge from "./pages/Fridge";
import Login from "./pages/Login";
import Recipe from "./pages/Recipe";
import Footer from "./pages/Footer";
import Profile from "./pages/Profile";
import Homepage from "./pages/Homepage";

const App = () => {
  return (
    <>
      <Version>v 1.02</Version>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
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

const Version = styled.div`
  position: absolute;
  opacity: 0.6;
  font-size: 10px;
  bottom: 0;
  padding-right: 5px;
  right: 0;
  z-index: 20000;
`;

export default App;
