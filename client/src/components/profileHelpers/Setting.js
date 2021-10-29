import React, { useState } from "react";
import styled from "styled-components";
import NotStyledButton from "../../buttons/NoStyledButton";
import {
  AiOutlineEdit,
  AiOutlineCloseCircle,
  AiOutlineCheckCircle,
} from "react-icons/ai";

const Setting = ({ type, editable, name, userInfo, index, handleClick }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(userInfo);

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  return (
    <Wrapper even={index % 2 === 0}>
      {name} :
      {type === "avatarSrc" ? (
        <ChangeAvatar>Change Avatar</ChangeAvatar>
      ) : type === "password" ? (
        isEditing ? (
          <EditInput
            type="text"
            value={value}
            onChange={(ev) => {
              setValue(ev.target.value);
            }}
          />
        ) : (
          <Info>
            {userInfo.split("").map(() => {
              return "*";
            })}
          </Info>
        )
      ) : isEditing ? (
        <EditInput
          type="text"
          value={value}
          onChange={(ev) => {
            setValue(ev.target.value);
          }}
        />
      ) : (
        <Info>{userInfo}</Info>
      )}
      {isEditing ? (
        <Span>
          <Confirm onClick={handleClick}>
            <AiOutlineCheckCircle size={17} />
          </Confirm>
          <Close onClick={toggleEditing}>
            <AiOutlineCloseCircle size={17} />
          </Close>
        </Span>
      ) : (
        editable && (
          <Edit onClick={toggleEditing}>
            <AiOutlineEdit size={17} />
          </Edit>
        )
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  padding: 5px;
  background: ${({ even }) => (even ? "rgb(219, 219, 219,0.4)" : "white")};
  font-weight: bold;
`;

const EditInput = styled.input`
  border: none;
  outline: none;
  font-family: inherit;
  padding: 0;
  padding-left: 10px;
  margin-left: 5px;
  height: 17px;
`;

const Info = styled.span`
  font-weight: 100;
  padding-left: 5px;
`;

const Edit = styled(NotStyledButton)`
  z-index: 50;
  position: absolute;
  right: 0;
  padding: 5px;
  transition: 0.2s ease-in-out;
  &:hover {
    transform: translate(-15%);
  }
`;

const Span = styled.span`
  position: absolute;
  right: 0;
`;

const ChangeAvatar = styled(NotStyledButton)`
  border: 1px dashed rgb(209, 207, 207);
  margin-left: 5px;
  transition: 0.2s ease-in-out;
  &:hover {
    border: 1px dashed white;
    background: rgb(209, 207, 207);
  }
  &:active {
    transform: scale(0.9);
  }
`;

const Confirm = styled(NotStyledButton)`
  color: green;
  padding: 5px;
  margin: 0 5px;
  z-index: 50;
`;
const Close = styled(NotStyledButton)`
  z-index: 50;
  padding: 5px;
  color: red;
`;

export default Setting;
