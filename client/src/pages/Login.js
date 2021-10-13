import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import FormHelper from "../components/form/FormHelper";
import NotStyledButton from "../buttons/NoStyledButton";
import { UserContext } from "../components/contexts/UserContext";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  const { setUser } = useContext(UserContext);

  useEffect(() => {
    let loginElement = document.getElementById("loginButton");
    isLoading
      ? (loginElement.innerText = "Loading...")
      : (loginElement.innerText = "Login");
  }, [isLoading]);

  const handleLogin = (ev) => {
    setIsLoading(true);
    setErrors([]);

    ev.preventDefault();
    const form = document.forms.loginForm.elements;
    let fullForm = {};

    for (let i = 0; i < form.length; i++) {
      let key = form[i].name;
      let value = form[i].value;
      if (value) {
        fullForm[key] = value;
      } else if (key === "") {
      } else {
        fullForm[key] = null;
      }
    }
    if (fullForm.userName !== null && fullForm.password !== null) {
      fetch(
        `/user/userName/${fullForm.userName}/password/${fullForm.password}`
      ).then((res) =>
        res.json().then(({ data, status }) => {
          setIsLoading(false);

          if (status === 202) {
            setUser(data);
            localStorage.setItem("fridgeUser", true);
            localStorage.setItem("fridgeUserId", data._id);
          } else {
            setErrors([
              { error: "wrong password or user name", type: "password" },
              { error: "wrong password or user name", type: "userName" },
            ]);
          }
        })
      );
    } else {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };

  return (
    <Wrapper>
      <TopWrapper>
        Login
        <SignUpWrapper>
          New to the site?
          <SignUpButton onClick={() => history.push("/signup")}>
            Register
          </SignUpButton>
        </SignUpWrapper>
      </TopWrapper>
      <Form id="loginForm">
        <InputsWrapper>
          <FormHelper
            label={"User Name"}
            input={{ type: "text", name: "userName", required: true }}
            formSubErrors={errors}
          />
          <FormHelper
            label={"Password"}
            input={{ type: "password", name: "password", required: true }}
            formSubErrors={errors}
          />
        </InputsWrapper>
        <LoginWrapper>
          <LoginButton
            disabled={isLoading}
            id="loginButton"
            onClick={handleLogin}
          >
            Login
          </LoginButton>
        </LoginWrapper>
      </Form>
    </Wrapper>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const LoginWrapper = styled.div`
  padding: 30px 0;
  border-top: 2px solid rgb(214, 214, 214);
  background: rgb(214, 214, 214, 0.5);
  margin-top: 30px;
  display: flex;
  justify-content: center;
`;

const LoginButton = styled.button`
  cursor: pointer;
  font-size: 17px;
  width: 70%;
  padding: 20px 15px;
  transition: background 0.4s ease-in-out, transform 0.1s ease-in-out,
    color 0.4s ease-in-out;
  color: white;
  background: rgb(40, 122, 46, 0.5);
  &:hover {
    background: rgb(40, 122, 46);
  }
  &:active {
    transform: scale(0.9);
  }
  outline: none;
  border: 1px solid rgb(2, 56, 6, 0.4);
  border-radius: 12px;
`;
const Wrapper = styled.div``;

const InputsWrapper = styled.div``;

const SignUpWrapper = styled.div`
  margin-top: 10px;
  font-size: 13px;
`;
const SignUpButton = styled(NotStyledButton)`
  color: white;
  font-size: 12px;
`;

const TopWrapper = styled.div`
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
  margin-bottom: 20px;
`;

export default Login;
