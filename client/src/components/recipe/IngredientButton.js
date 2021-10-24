import React, { useState } from "react";
import styled from "styled-components";

// the ingredient button that we see in the Recipe.js
// toggles on/off if you have/don't have that item
export const IngredientButton = ({ name, image, text }) => {
  const [hasItem, setHasItem] = useState(false);
  const handleHasItem = () => {
    setHasItem(!hasItem);
  };
  return (
    <IngredientItemButton key={name} hasItem={hasItem} onClick={handleHasItem}>
      {image && (
        <IngredientImage
          src={`https://spoonacular.com/cdn/ingredients_100x100/${image}`}
        />
      )}
      <SubText>{text}</SubText>
    </IngredientItemButton>
  );
};

const IngredientImage = styled.img`
  margin-right: 30px;
  width: 50px;
  height: 50px;
`;
const IngredientItemButton = styled.button`
  font-size: 15px;
  display: flex;
  justify-content: flex-start;
  font-weight: bold;
  border: 3px dashed var(--app-bg-color-theme);
  opacity: ${(props) => {
    return props.hasItem === true ? "0.5" : "1";
  }};
  background: white;
  cursor: pointer;
  outline: none;
  border-radius: 5px;
  width: 240px;
  margin: 5px 0px;
  transition: 0.1s ease-in-out;
  transform: ${(props) =>
    props.hasItem === true
      ? `translate(-35%) scale(.9)`
      : ` translate(-20%) scale(1)`};
  &:hover {
    opacity: 0.8;
  }
  &:active {
    transform: scale(0.9);
  }
`;

const SubText = styled.span``;
