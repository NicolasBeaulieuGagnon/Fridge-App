import React from "react";
import styled from "styled-components";
import Setting from "./Setting";
import { settingChoices } from "./settingChoices";

const Settings = ({ user, updateUser, setUpdateUser }) => {
  const EditUserInfo = (newValue, oldValue, type) => {};

  return (
    <Wrapper>
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
`;

export default Settings;
