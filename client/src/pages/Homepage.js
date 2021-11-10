import React, { useContext } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

import { UserContext } from "../components/contexts/UserContext";
import { changeLogs } from "../changeLogs";
import Changes from "../components/Changes";

import NotStyledButton from "../buttons/NoStyledButton";

const Homepage = () => {
  const { user } = useContext(UserContext);

  const history = useHistory();
  return (
    <>
      <Wrapper>
        <Title>Welcome {user.userName} !</Title>
        {localStorage.getItem("fridgeUser") ? (
          <ChangeLogs>
            <LogTitle>Change logs!</LogTitle>
            {changeLogs.length > 0 &&
              changeLogs.map((change, index) => {
                return <Changes key={index} change={change} />;
              })}
          </ChangeLogs>
        ) : (
          <SignInWrapper>
            New to the Fridge Family? Create an account or login to an existing
            account to start saving your found recipes!
            <Button
              onClick={() => history.push("/signup")}
              style={{ marginTop: "50px" }}
            >
              Sign Up
            </Button>
            <Button onClick={() => history.push("/login")}>Login</Button>
          </SignInWrapper>
        )}
      </Wrapper>
    </>
  );
};

const ChangeLogs = styled.div`
  margin: 50px 10%;
  padding: 20px;
  background: rgb(127, 57, 251, 255);
  border-radius: 5px;
  color: white;
  text-shadow: 0 0 10px black;
`;

const SignInWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  text-align: center;
  margin: 50px 10% 0;
  max-width: 600px;
`;
const Button = styled(NotStyledButton)`
  border: 1px solid var(--app-bg-color-theme);
  font-size: 18px;
  width: 150px;
  padding: 5px 20px;
  margin: 9px;
  transition: background 0.4s ease-in-out, color 0.4s ease-in-out,
    transform 0.2s ease-in-out;

  &:hover {
    background: var(--app-bg-color-theme);
    color: white;
  }
  &:active {
    transform: scale(0.9);
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 50px);
  overflow: auto;
  overflow-x: hidden;
`;

const Title = styled.div`
  background: var(--app-bg-color-theme);
  color: white;
  width: 100vw;
  display: flex;
  flex-direction: column;
  text-align: center;
  padding-top: 7%;
  padding-bottom: 40px;
  font-size: 30px;
  text-shadow: 0 0 10px rgb(46, 45, 46);
  box-shadow: 0 0 20px 10px grey;
`;

const LogTitle = styled.div`
  font-weight: bold;
`;
export default Homepage;
