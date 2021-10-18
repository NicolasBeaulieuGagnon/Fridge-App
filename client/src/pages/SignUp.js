import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import AvatarOptionModal from "../modals/AvatarOptionModal";
import { UserContext } from "../components/contexts/UserContext";
import { formInfoNeeded } from "../components/form/formInfoNeeded";
import FormHelper from "../components/form/FormHelper";
import {
  checkPassword,
  checkUserName,
  checkRequired,
  checkIfValidEmail,
} from "../components/form/formValidationFunctions";
import NotStyledButton from "../buttons/NoStyledButton";

const Signup = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [errorArray, setErrorArray] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [userAvatar, setUserAvatar] = useState(null);
  const { setUser } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    setDisabled(true);
    fetch(`/users`).then((res) => {
      res.json().then(({ data }) => {
        setAllUsers(data);
        setDisabled(false);
      });
    });
  }, []);

  const handleForm = (ev) => {
    ev.preventDefault();
    let fullForm = {};
    const form = document.forms.userCreation.elements;

    for (let i = 0; i < form.length; i++) {
      let key = form[i].name;
      let value = form[i].value;
      if (value) {
        fullForm[key] = value;
      } else {
        fullForm[key] = null;
      }
    }
    if (userAvatar) {
      fullForm.avatarSrc = userAvatar;
    } else {
      fullForm.avatarSrc = null;
    }
    console.log(fullForm);
    const errors = [
      ...checkRequired(fullForm, formInfoNeeded),
      ...checkPassword(fullForm.password, fullForm.confirmPassword),
      ...checkUserName(allUsers, fullForm.userName),
      ...checkIfValidEmail(fullForm.email),
    ];

    if (errors.length === 0) {
      fetch(`/user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fullForm }),
      })
        .then((res) =>
          res.json().then((data) => {
            localStorage.setItem("fridgeUser", true);
            localStorage.setItem("fridgeUserId", data.data._id);

            setUser(data.data);
          })
        )
        .then(() => history.push("/"));
    }
    setErrorArray(errors);
  };

  const handleRemoveAvatarChoice = (ev) => {
    ev.stopPropagation();
    ev.preventDefault();
    setUserAvatar(null);
  };

  return (
    <>
      <AvatarOptionModal
        userAvatar={userAvatar}
        setUserAvatar={setUserAvatar}
      />
      <Wrapper>
        <TopWrapper>
          {userAvatar ? (
            <>
              <AvatarChoiceDisplay src={userAvatar} alt="avatar pick" />
              <RemoveAvatarPick onClick={handleRemoveAvatarChoice}>
                x
              </RemoveAvatarPick>
            </>
          ) : (
            <></>
          )}
          Create new <div>Account</div>
          <LoginWrapper>
            Already Registered?{" "}
            <LoginButton
              onClick={() => {
                history.push("/login");
              }}
            >
              Login
            </LoginButton>
          </LoginWrapper>
        </TopWrapper>

        <Form id="userCreation">
          {formInfoNeeded.map((info) => {
            return (
              <FormHelper
                formSubErrors={errorArray}
                users={allUsers}
                label={info.label}
                input={info.input}
              />
            );
          })}

          <SubmitWrapper>
            <SubmitButton disabled={disabled} onClick={handleForm}>
              Submit
            </SubmitButton>
          </SubmitWrapper>
        </Form>
      </Wrapper>
    </>
  );
};

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

const LoginWrapper = styled.div`
  margin-top: 10px;
  font-size: 13px;
`;

const LoginButton = styled(NotStyledButton)`
  color: white;
  font-size: 12px;
`;

const AvatarChoiceDisplay = styled.img`
  position: absolute;
  width: 65px;
  right: 5%;
  height: auto;
  border-radius: 20px;
  border: 1px dashed gray;
  margin-top: 75px;
  padding: 5px;
  background: white;
`;

const RemoveAvatarPick = styled(NotStyledButton)`
  font-weight: bold;
  color: rgb(66, 2, 2);
  position: absolute;
  height: 20px;
  font-size: 16px;
  padding: 0;
  width: 20px;
  right: 5%;
  margin-right: -5px;
  margin-top: 85px;

  border: 1px solid rgb(214, 214, 214);
  background: white;
  border-radius: 50px;
  transition: 0.2s ease-in-out;
  &:hover {
    background: rgb(214, 214, 214);
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const SubmitWrapper = styled.div`
  padding: 30px 0;
  border-top: 2px solid rgb(214, 214, 214);
  background: rgb(214, 214, 214, 0.5);
  margin-top: 30px;
  display: flex;
  justify-content: center;
`;

const SubmitButton = styled.button`
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
export default Signup;
