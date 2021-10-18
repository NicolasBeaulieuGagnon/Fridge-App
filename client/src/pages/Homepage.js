import React, { useContext } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

import { UserContext } from "../components/contexts/UserContext";
import fridgeIcon from "../assets/fridgeIcon.png";
import NotStyledButton from "../buttons/NoStyledButton";

const Homepage = () => {
  const { user } = useContext(UserContext);

  const history = useHistory();
  console.log(user);
  return (
    <>
      <Wrapper>
        <Title>Welcome {user.userName} !</Title>
        {user.userName ? (
          <div></div>
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
`;

const Title = styled.div`
  background: var(--app-bg-color-theme);
  color: white;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 7%;
  padding-bottom: 40px;
  font-size: 30px;
  text-shadow: 0 0 10px rgb(46, 45, 46);
  box-shadow: 0 0 20px 10px grey;
`;
export default Homepage;
