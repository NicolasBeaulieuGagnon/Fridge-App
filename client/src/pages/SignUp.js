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
            localStorage.setItem("userLoggedIn", true);
            localStorage.setItem("loggedInUserId", data.data._id);

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
        SignIn
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

          {userAvatar ? (
            <AvatarChoiceWrapper>
              <AvatarChoiceDisplay src={userAvatar} alt="avatar pick" />
              <RemoveAvatarPick onClick={handleRemoveAvatarChoice}>
                x
              </RemoveAvatarPick>
            </AvatarChoiceWrapper>
          ) : (
            <></>
          )}
          <SubmitButton disabled={disabled} onClick={handleForm}>
            Submit
          </SubmitButton>
        </Form>
      </Wrapper>
    </>
  );
};

const AvatarChoiceWrapper = styled.div`
  position: relative;
`;

const AvatarChoiceDisplay = styled.img`
  position: absolute;
  width: 45px;
  height: auto;
  right: 187px;
  top: -42px;
`;

const RemoveAvatarPick = styled(NotStyledButton)`
  font-weight: bold;
  color: rgb(66, 2, 2);
  position: absolute;
  right: 187px;
  top: -45px;
  height: 17px;
  font-size: 12px;
  padding: 0;
  width: 16px;
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
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  border: 2px solid black;
  margin-top: 50px;
  padding: 50px 20px;
  display: flex;
  flex-direction: column;
`;

const SubmitButton = styled.button`
  cursor: pointer;
  margin-top: 10px;
  padding: 10px 15px;
  transition: background 0.4s ease-in-out, transform 0.1s ease-in-out,
    color 0.4s ease-in-out;
  &:hover {
    color: white;
    background: rgb(40, 122, 46);
  }
  &:active {
    transform: scale(0.9);
  }
  outline: none;
  border: 1px solid rgb(2, 56, 6, 0.4);
  border-radius: 2px;
`;
export default Signup;
