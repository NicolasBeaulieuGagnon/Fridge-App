import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signup from "./pages/SignUp";
import styled from "styled-components";

import { changeLogs } from "./changeLogs";
import { GlobalStyle } from "./components/GlobalStyle";
import Fridge from "./pages/Fridge";
import Login from "./pages/Login";
import Recipe from "./pages/Recipe";
import Footer from "./pages/Footer";
import Profile from "./pages/Profile";
import Homepage from "./pages/Homepage";

const App = () => {
  const [openNav, setOpenNav] = useState(true);

  // to be able to close the FooterNav from anywhere while clicking away from it.
  useEffect(() => {
    const closeNav = () => {
      setOpenNav(true);
    };

    document.body.addEventListener("click", closeNav);

    return () => {
      document.body.removeEventListener("click", closeNav);
    };
  }, []);
  return (
    <>
      <Version> V - {changeLogs[changeLogs.length - 1].version}</Version>
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
        <Footer openNav={openNav} setOpenNav={setOpenNav} />
      </Router>
    </>
  );
};

const Version = styled.div`
  position: absolute;
  opacity: 0.6;
  font-size: 10px;
  top: 5px;
  padding-right: 5px;
  right: 5px;
  z-index: 20000;
`;

export default App;
