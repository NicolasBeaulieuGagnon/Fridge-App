import React, { useState } from "react";
import styled from "styled-components";
import NotStyledButton from "../buttons/NoStyledButton";

const Changes = ({ change: { type, version, changes, message } }) => {
  const [showChange, setShowChange] = useState(false);
  return (
    <Wrapper show={showChange}>
      <TypeButton onClick={() => setShowChange(!showChange)}>
        {type}
        <Version> -- {version}</Version>
      </TypeButton>
      <ChangeList>
        {changes.map((element, index) => (
          <ChangeItem key={index}> - {element}</ChangeItem>
        ))}
      </ChangeList>
      <Message>{message}</Message>
    </Wrapper>
  );
};

const Version = styled.span`
  color: grey;
  font-style: italic;
  font-size: 10px;
`;
const Wrapper = styled.div`
  text-shadow: none;
  color: black;
  padding-top: 10px;
  background: rgb(255, 255, 255, 0.7);
  margin-top: 5px;
  padding: 5px;
  border-radius: 5px;
  transition: 0.2s ease-in-out;
  overflow: ${({ show }) => (show ? "auto" : "hidden")};
  height: ${({ show }) => (show ? "150px" : "25px")};
  &:hover {
    &::-webkit-scrollbar-thumb {
      background: rgb(127, 57, 251, 0.7);
    }
  }
  &::-webkit-scrollbar-thumb {
    background: none;
  }
`;
const TypeButton = styled(NotStyledButton)`
  font-size: inherit;
`;

const ChangeList = styled.ul`
  list-style-type: none;
  padding: 0 15px;
`;
const ChangeItem = styled.li`
  padding: 1px;
`;
const Message = styled.div``;

export default Changes;
