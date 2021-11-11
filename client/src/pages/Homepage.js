import React, { useState, useContext } from "react";
import { useHistory } from "react-router";
import { useTransition, animated } from "react-spring";
import styled from "styled-components";
import { AiFillBug } from "react-icons/ai";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

import { UserContext } from "../components/contexts/UserContext";
import { changeLogs } from "../changeLogs";
import Changes from "../components/Changes";

import NotStyledButton from "../buttons/NoStyledButton";

const Homepage = () => {
  const [showLogs, setShowLogs] = useState(false);
  const { user } = useContext(UserContext);

  const transition = useTransition(showLogs, {
    from: {
      x: -800,
      y: -800,
      opacity: 0,
      maxWidth: 0,
    },
    enter: {
      x: 0,
      y: 0,
      opacity: 1,
      maxWidth: 800,
    },
    leave: {
      x: -800,
      y: -400,
      opacity: 0,
      maxWidth: 0,
    },
  });

  const history = useHistory();
  return (
    <>
      <Wrapper>
        <Title>Welcome {user.userName} !</Title>
        {localStorage.getItem("fridgeUser") ? (
          <>
            <Tippy content="Change Logs">
              <BugButton onClick={() => setShowLogs(!showLogs)}>
                <AiFillBug />
              </BugButton>
            </Tippy>
            {/* {showLogs && (
              <ChangeLogs>
                <LogTitle>Change logs!</LogTitle>
                {changeLogs.length > 0 &&
                  changeLogs.map((change, index) => {
                    return <Changes key={index} change={change} />;
                  })}
              </ChangeLogs>
            )} */}
            {transition((style, item) =>
              item ? (
                <animated.div style={style}>
                  <ChangeLogs>
                    <LogTitle>Change logs!</LogTitle>
                    {changeLogs.length > 0 &&
                      changeLogs.map((change, index) => {
                        return <Changes key={index} change={change} />;
                      })}
                  </ChangeLogs>
                </animated.div>
              ) : (
                ""
              )
            )}
          </>
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

const BugButton = styled(NotStyledButton)`
  position: absolute;
  font-size: 16px;
  color: white;
  border: 1px dashed white;
  border-radius: 50px;
  padding: 5px 5px 1px;
  margin: 5px;
  left: 0;
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
