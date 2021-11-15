import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useHistory } from "react-router";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

import { CircularProgress } from "@material-ui/core";
import { HiOutlineSave } from "react-icons/hi";

import MainStyledButton from "../../buttons/MainStyledButton";
import NotStyledButton from "../../buttons/NoStyledButton";

const NewestSaved = ({ user, updateUser, setUpdateUser }) => {
  const [loadedRecipe, setLoadedRecipe] = useState({});
  const [loading, setLoading] = useState(true);
  const [isRandom, setIsRandom] = useState(false);

  const history = useHistory();

  const saveRecipe = () => {
    const recipe = {
      image: loadedRecipe.image,
      title: loadedRecipe.title,
      _id: loadedRecipe.id,
    };

    fetch("/user/recipeBook/editRecipes", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ type: "add", recipe, _id: user._id }),
    }).then((res) => {
      res.json().then(() => {
        setUpdateUser(!updateUser);
        history.push(`/recipe/${loadedRecipe.id}`);
      });
    });
  };

  useEffect(() => {
    if (user._id) {
      fetch(`/getApiKey`).then((res) => {
        res.json().then((data) => {
          let url = "";
          if (user.recipes.length > 1) {
            let recipeId = user.recipes[user.recipes.length - 1]._id;
            url = `https://api.spoonacular.com/recipes/${recipeId}/information?includeNutrition=false&apiKey=${data.data}`;
          } else {
            setIsRandom(true);
            url = `https://api.spoonacular.com/recipes/random?apiKey=${data.data}`;
          }
          fetch(url).then((res) =>
            res.json().then((data) => {
              if (data.recipes) {
                setLoadedRecipe(data.recipes[0]);
              } else {
                setLoadedRecipe(data);
              }
              setLoading(false);
            })
          );
        });
      });
    }
  }, [user]);

  return (
    <Wrapper>
      <Title>{isRandom ? "Random " : "Recently saved "}recipe</Title>
      {loading ? (
        <CircularProgress />
      ) : (
        <RecipeWrapper>
          <Link to={`/recipe/${loadedRecipe.id}`}>
            <ImageWrapper>
              <Image alt="recipe image" src={loadedRecipe.image} />
            </ImageWrapper>
          </Link>
          <InfoWrapper>
            <div>
              <RecipeTitle>{loadedRecipe.title}</RecipeTitle>
              <Info>ready in {loadedRecipe.readyInMinutes} minutes</Info>
              <Info>makes {loadedRecipe.servings} servings</Info>
              <Info>
                {loadedRecipe.extendedIngredients.length} ingredient
                {loadedRecipe.extendedIngredients.length === 1 ? "" : "s"}
              </Info>
            </div>
            <ButtonsWrapper>
              <Button
                onClick={() => history.push(`/recipe/${loadedRecipe.id}`)}
              >
                Start cooking!
              </Button>
              {isRandom && (
                <Tippy content="save">
                  <PlainButton onClick={saveRecipe}>
                    <HiOutlineSave size={27} />
                  </PlainButton>
                </Tippy>
              )}
            </ButtonsWrapper>
          </InfoWrapper>
        </RecipeWrapper>
      )}
    </Wrapper>
  );
};

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
`;

const PlainButton = styled(NotStyledButton)`
  color: var(--app-bg-color-theme);
  transition: 300ms ease;
  &:hover {
    transform: translateY(5px);
    color: white;
  }
  &:active {
    transform: rotate(180deg);
  }
`;

const Button = styled(MainStyledButton)`
  background: white;
  border: 1px solid var(--app-bg-color-theme);
  font-size: 15px;
  padding: 5px 20px;
  transition: background 0.4s ease-in-out, color 0.4s ease-in-out,
    transform 0.2s ease-in-out;

  &:hover {
    background: var(--app-bg-color-theme);
    color: white;
    transform: scale(1);
  }
  &:active {
    transform: scale(0.9);
  }
`;

const Wrapper = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RecipeWrapper = styled.div`
  display: flex;
  color: black;
  text-decoration: none;
  border: 1px solid rgb(0, 0, 0, 0.2);
  box-shadow: 0 0 3px 1px rgb(0, 0, 0, 0.2);
  border-radius: 5px;
  padding: 10px;
  margin: 10px 0 0 0;
  @media screen and (max-width: 440px) {
    flex-direction: column;
  }
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 4px;
`;

const ImageWrapper = styled.div`
  max-width: 300px;
  margin: 10px 0;
  overflow: hidden;
  transition: 200ms ease;

  &:hover {
    transform: translate(1%);
    opacity: 0.8;
  }
`;

const Title = styled.div`
  font-weight: bold;
  margin: 20px;
`;

const RecipeTitle = styled.div`
  font-weight: bold;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 5px;
  padding: 10px;
  border-radius: 5px;
  background: rgb(255, 255, 255);
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(236, 236, 236, 1) 20%,
    rgba(209, 204, 204, 1) 84%
  );
  @media screen and (max-width: 440px) {
    align-items: center;
    background: rgb(255, 255, 255);
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 1) 0%,
      rgba(236, 236, 236, 1) 20%,
      rgba(209, 204, 204, 1) 84%
    );
  }
`;

const Info = styled.div`
  padding: 1px;
`;

export default NewestSaved;
