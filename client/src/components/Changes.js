import React from "react";
import styled from "styled-components";

const Changes = ({ change: { type, version, changes, message } }) => {
  return (
    <Wrapper>
      <Type>
        {type}
        <Version> -- {version}</Version>
      </Type>
      <ChangeList>
        {changes.map((element) => (
          <ChangeItem> - {element}</ChangeItem>
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
  padding-top: 10px;
`;
const Type = styled.div``;
const ChangeList = styled.ul`
  list-style-type: none;
  padding: 0 15px;
`;
const ChangeItem = styled.li`
  padding: 1px;
`;
const Message = styled.div``;

export default Changes;
