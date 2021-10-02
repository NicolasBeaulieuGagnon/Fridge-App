import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signup from "./pages/SignUp";
import styled from "styled-components";
import { GlobalStyle } from "./components/GlobalStyle";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route exact path="/signup">
            <Signup />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

const Wrapper = styled.div``;
export default App;
