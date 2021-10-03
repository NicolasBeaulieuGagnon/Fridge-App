import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Ingredient from "../components/fridge/Ingredient";
import MainStyledButton from "../buttons/MainStyledButton";

const Fridge = () => {
  const [ingredientsArray, setIngredientsArray] = useState([]);

  const handleRemoveItem = (ev) => {
    const filteredArray = ingredientsArray.filter((item) => {
      return item !== ev.target.id;
    });

    setIngredientsArray(filteredArray);
  };

  const handleAddItem = (ev) => {
    const item = document.getElementById("textInputId");
    if (ev.key === "Enter" || ev.target.id === "Enter") {
      if (item.value.length > 2) {
        setIngredientsArray((ingredientsArray) => [
          ...ingredientsArray,
          item.value,
        ]);
        setTimeout(() => {
          item.value = "";
        });
      }
    }
  };
  return (
    <Wrapper>
      <Title>The Fridge</Title>
      <InputWrapper>
        Type in your fridge contents.
        <Input
          onKeyDown={handleAddItem}
          type="text"
          id="textInputId"
          placeholder="what's in your fridge?"
        />
        <AddButton id="Enter" onClick={handleAddItem}>
          Add
        </AddButton>
      </InputWrapper>
      <IngredientsWrapper>
        {ingredientsArray &&
          ingredientsArray.map((item, index) => {
            return (
              <Ingredient
                key={`${item}-${index}`}
                item={item}
                onClick={handleRemoveItem}
              />
            );
          })}
      </IngredientsWrapper>
    </Wrapper>
  );
};

const Label = styled.label``;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 10px;
`;

const Title = styled.h1`
  background: rgb(0, 44, 120);
  color: white;
  padding: 20px;
  text-shadow: 5px 5px 20px black;
  box-shadow: 0 10px 20px 5px grey;
  border-bottom: 4px solid rgb(0, 0, 0, 0.6);
`;

const AddButton = styled(MainStyledButton)``;

const Input = styled.input`
  margin: 15px;
  margin-left: 0;
  height: 35px;
  width: 300px;
`;

const SearchButton = styled(MainStyledButton)``;

const Wrapper = styled.div`
  background: var(--main-bg-color);
  height: 100vh;
  width: auto;
`;

const IngredientsWrapper = styled.ul`
  margin: 0;
  padding: 10px 20px;
  font-size: 22px;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
  margin-left: 2.5px;
  overflow-y: scroll;
  list-style-type: none;
  &::-webkit-scrollbar-track {
    background: black;
    border-radius: 2px;
  }
`;

export default Fridge;
