import React from "react";
import styled from "styled-components";
import Setting from "./Setting";
import { settingChoices } from "./settingChoices";
import { checkIfValidEmail } from "../form/formValidationFunctions";

const Settings = ({ user, updateUser, setUpdateUser, isClosed }) => {
  const EditUserInfo = (newValue, type, toggleEditing) => {
    let emailError = [];
    if (type === "email") {
      emailError = checkIfValidEmail(newValue);
    }
    if (emailError.length > 0) {
      toggleEditing();
      return;
    } else {
      let message = {};
      message[type] = newValue;
      fetch(`/user/${user._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...message }),
      }).then((res) => {
        res.json().then((data) => {
          console.log(data);
          toggleEditing();
          setUpdateUser(!updateUser);
        });
      });
    }
  };

  return (
    <Wrapper isClosed={isClosed}>
      {settingChoices.map(({ type, editable, name }, index) => {
        return (
          <Setting
            type={type}
            editable={editable}
            name={name}
            userInfo={user[type]}
            index={index}
            handleClick={EditUserInfo}
          />
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 20px 5%;
  transition: 200ms ease-in-out;
  height: ${({ isClosed }) => (isClosed ? `0px` : `175px`)};
  overflow: hidden;
`;

export default Settings;
