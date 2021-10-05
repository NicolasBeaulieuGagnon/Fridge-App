import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Ingredient from "../components/fridge/Ingredient";
import RadioButtonComponent from "../components/fridge/RadioButtonComponent";
import MainStyledButton from "../buttons/MainStyledButton";

import { IoIosArrowUp } from "react-icons/io";
import RecipeDisplay from "../components/fridge/RecipeDisplay";

const Fridge = () => {
  const [ingredientsArray, setIngredientsArray] = useState([]);
  const [foundRecipes, setFoundRecipes] = useState([]);
  const [choice, setChoice] = useState(null);
  const [searching, setSeearching] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const fridgeTab = document.getElementById("fridgeWrapper");
    setTimeout(() => {
      fridgeTab.style.height = "95vh";
      fridgeTab.style.transform = "translateY(2%)";
    }, 200);

    setTimeout(() => {
      fridgeTab.style.transform = "translateY(0%)";
    }, 450);
  }, []);

  const handleRecipeSearch = () => {
    //set loading state...

    document.getElementById("fridgeWrapper").style.height = "3vh";
    setIsCollapsed(true);

    fetch("/getApiKey").then((res) => {
      res.json().then(({ data }) => {
        let url;
        if (choice) {
          url = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${data}&ingredients=${ingredientsArray.toString()}&ranking=${choice}&number=50`;
        } else {
          url = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${data}&ingredients=${ingredientsArray.toString()}&number=50`;
        }

        fetch(url).then((res) => {
          res.json().then((data) => {
            setFoundRecipes(data);
            setIngredientsArray([]);
          });
        });
      });
    });
  };

  const ToggleFridgeTab = () => {
    const fridgeTab = document.getElementById("fridgeWrapper");
    setIsCollapsed(!isCollapsed);
    if (fridgeTab.style.height === "3vh") {
      fridgeTab.style.height = "95vh";
    } else {
      fridgeTab.style.height = "3vh";
    }
  };

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
    <>
      <div style={{ position: "relative" }}>
        <Wrapper id="fridgeWrapper">
          <InputWrapper>
            <TitleWrapper>Type in your fridge contents.</TitleWrapper>
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
          <RadioButtonComponent choice={choice} setChoice={setChoice} />

          <SearchButton
            disabled={ingredientsArray.length === 0}
            onClick={handleRecipeSearch}
          >
            Search
          </SearchButton>
        </Wrapper>
        <FridgeTabButton isCollapsed={isCollapsed} onClick={ToggleFridgeTab}>
          <IoIosArrowUp style={{ marginBottom: "-3px" }} />
        </FridgeTabButton>
      </div>
      <RecipeDisplay foundRecipes={foundRecipes} />
    </>
  );
};

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FridgeTabButton = styled(MainStyledButton)`
  border: 1px solid black;
  position: absolute;
  bottom: -18px;
  left: 50%;
  transform: ${({ isCollapsed }) =>
    isCollapsed
      ? "translateX(-50%) rotate(180deg) "
      : " translateX(-50%) rotate(0deg) "};
  :hover {
    transform: ${({ isCollapsed }) =>
      isCollapsed
        ? "translateX(-50%) rotate(180deg) "
        : " translateX(-50%) rotate(0deg) "};
  }
`;

const TitleWrapper = styled.div`
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
  box-shadow: 0 0 20px 10px grey;
  border-bottom: 2px solid rgb(127, 57, 190);
`;

const AddButton = styled.button`
  cursor: pointer;
  font-size: 17px;
  width: 50%;
  padding: 20px 15px;
  transition: background 0.2s ease-in-out, transform 0.1s ease-in-out,
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

const Input = styled.input`
  height: 35px;
  width: 90%;
  outline: none;
  border: 1px solid rgb(124, 122, 125, 0.5);
  border-radius: 2px;
  margin-bottom: 40px;
`;

const SearchButton = styled(AddButton)`
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  :hover {
    background: ${({ disabled }) =>
      disabled ? "rgb(40, 122, 46, 0.5)" : "rgb(40, 122, 46)"};
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-items: center;
  border-bottom: 1px solid black;
  overflow: hidden;
  height: 0vh;
  transition: 0.3s ease-in-out;
  background: white;
`;

const IngredientsWrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  padding: 10px 20px;
  font-size: 22px;
  background: rgb(127, 57, 251, 0.2);
  border-radius: 25px;
  padding: 10px;
  overflow-y: scroll;
  list-style-type: none;
  width: 80%;
  min-height: 80px;
  max-height: 100px;
  &::-webkit-scrollbar-thumb {
    background: none;
  }
`;

export default Fridge;
