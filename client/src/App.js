import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signup from "./pages/SignUp";
import styled from "styled-components";
import { GlobalStyle } from "./components/GlobalStyle";
import Fridge from "./pages/Fridge";
import Login from "./pages/Login";

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
        </Switch>
      </Router>
    </>
  );
};

const Wrapper = styled.div``;
export default App;
