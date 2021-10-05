import React from "react";
import styled, { keyframes } from "styled-components";
import NotStyledButton from "../../buttons/NoStyledButton";

// each ingredient in the IngredientsArray from the InFridge.js
const Ingredient = ({ onClick, item }) => {
  return (
    <Item key={item}>
      <Wrapper>
        <RemoveItem id={item} onClick={onClick}>
          x
        </RemoveItem>
        {item}
      </Wrapper>
    </Item>
  );
};

const openLeft = keyframes`
0%{
  transform:translateX(100%);
  opacity:0;
}
99%{
}
100%{
  transform:translateX(0%);
  opacity: 1;

}
`;

const Item = styled.li`
  border: 2px solid black;
  border-radius: 10px;
  padding: 2px 5px 2px 17px;
  position: relative;
  background: rgb(70, 50, 99, 0.4);
  margin: 3px;
  animation: ${openLeft} 0.6s forwards;
`;
const Wrapper = styled.div``;

const RemoveItem = styled(NotStyledButton)`
  position: absolute;
  left: 0;
  top: 7px;
`;

export default Ingredient;
