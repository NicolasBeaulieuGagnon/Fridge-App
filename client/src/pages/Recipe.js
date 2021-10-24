import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import { IngredientButton } from "../components/recipe/IngredientButton";
import MainStyledButton from "../buttons/MainStyledButton";
import { UserContext } from "../components/contexts/UserContext";

const Recipes = () => {
  const [fullRecipe, setFullRecipe] = useState(null);
  const [ownsThisRecipe, setOwnsThisRecipe] = useState(false);

  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const { recipeId } = useParams();
  const { user, setUpdateUser, updateUser } = useContext(UserContext);

  useEffect(() => {
    if (user?.recipes?.some((recipe) => recipe._id === recipeId)) {
      setOwnsThisRecipe(true);
    }
  }, [user]);

  useEffect(() => {
    if (fullRecipe) {
      const description = document.getElementById("recipeDescription");
      const cutPoint = fullRecipe.summary.indexOf("All things");
      const newSummary = fullRecipe.summary.slice(0, cutPoint);
      description.innerHTML = newSummary;
    }
  }, [fullRecipe]);

  useEffect(() => {
    fetch(`/getApiKey`).then((res) => {
      res.json().then((data) => {
        const url = `https://api.spoonacular.com/recipes/${recipeId}/information?includeNutrition=false&apiKey=${data.data}`;
        fetch(url).then((res) =>
          res.json().then((data) => {
            setFullRecipe(data);
          })
        );
      });
    });
  }, [recipeId]);

  const handleSaveRecipe = () => {
    const recipe = {
      image: fullRecipe.image,
      title: fullRecipe.title,
      _id: recipeId,
    };

    fetch("/user/recipeBook/editRecipes", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ type: "add", recipe, _id: user._id }),
    }).then((res) =>
      res.json().then(() => {
        setOwnsThisRecipe(true);
        setUpdateUser(!updateUser);
      })
    );
  };

  return (
    <ResultWrapper>
      {fullRecipe && (
        <Wrapper
          style={{
            backgroundImage: `url(${fullRecipe.image})`,
            backgroundSize: `100%`,
            maxHeight: "270px",
            backgroundRepeat: `no-repeat`,
          }}
        >
          <RecipeWrapper>
            <Title>{fullRecipe.title}</Title>

            <RecipeInfoWrapper>
              <DetailedInfoWrapper>
                <DetailedInfo>
                  Ready Time : <Bold>{fullRecipe.readyInMinutes} minutes</Bold>
                </DetailedInfo>
                <DetailedInfo>
                  Cost :{" "}
                  <Bold>
                    {formatter.format(
                      (fullRecipe.servings * fullRecipe.pricePerServing) / 100
                    )}
                  </Bold>
                </DetailedInfo>
                <DetailedInfo>
                  Servings:
                  <Bold>{fullRecipe.servings}</Bold>
                </DetailedInfo>
                {ownsThisRecipe ? (
                  <>
                    <OwnedRecipe>Saved</OwnedRecipe>
                  </>
                ) : (
                  <AddCookBookBtn
                    id="addToCookBookButton"
                    onClick={handleSaveRecipe}
                  >
                    Save Recipe
                  </AddCookBookBtn>
                )}
              </DetailedInfoWrapper>
              <RecipeDescription id="recipeDescription" />
              <Ingredients>
                Ingredients
                <SubText>check off what you have</SubText>
                <IngredientsItemsList>
                  {fullRecipe.extendedIngredients.map((ing, index) => {
                    return (
                      <IngredientButton
                        key={index}
                        name={ing.name}
                        image={ing.image}
                        text={ing.originalString}
                      />
                    );
                  })}
                </IngredientsItemsList>
              </Ingredients>
            </RecipeInfoWrapper>
            <StepsWrapper>
              Steps:
              {fullRecipe.analyzedInstructions.length > 0 ? (
                <StepsItemList>
                  {fullRecipe.analyzedInstructions[0].steps.map((step) => {
                    return (
                      <StepWrapper key={step.number}>
                        <StepNumber>{step.number}</StepNumber>
                        {step.ingredients.length > 0 &&
                          step.ingredients.map(() => {})}
                        <StepItem>{step.step}</StepItem>
                        <StepBorder />
                      </StepWrapper>
                    );
                  })}
                </StepsItemList>
              ) : (
                <NoInstructionsDiv>
                  No Instructions came with this Recipe Unfortunetly.
                </NoInstructionsDiv>
              )}
            </StepsWrapper>
          </RecipeWrapper>
        </Wrapper>
      )}
    </ResultWrapper>
  );
};

const ResultWrapper = styled.div`
  overflow: scroll;
  height: calc(100vh - 45px);
`;

const NoInstructionsDiv = styled.div``;

const Title = styled.h1`
  text-shadow: 2px -2px 5px white;
  position: relative;
  margin: 0;
  padding-top: 30px;
  padding-bottom: 30px;
  padding-left: 10px;
  box-shadow: 0 2px 9px 0.1px var(--dark-accent);
  backdrop-filter: blur(3px);
`;

const AddCookBookBtn = styled(MainStyledButton)`
  border: none;
  color: var(--app-bg-color-theme);
  background: white;
  position: absolute;
  bottom: 5px;
  right: 10px;
`;
const OwnedRecipe = styled.div`
  text-shadow: none;
  background: white;
  color: var(--app-bg-color-theme);
  margin-left: 10px;
  font-size: 22px;
  font-weight: bold;
  position: absolute;
  border-radius: 2px;
  padding: 2px 10px;
  bottom: 2px;
  right: 2px;
`;

const RecipeWrapper = styled.div`
  width: 100%;
`;

const Bold = styled.span`
  background: var(--primary-bg-color);
  font-weight: bold;
  padding-left: 5px;
`;
const DetailedInfo = styled.div`
  background: var(--primary-bg-color);
  padding: 2px 50px;
`;
const DetailedInfoWrapper = styled.div`
  position: relative;
  background: var(--app-bg-color-theme);
  color: white;
  text-shadow: 0 0 10px rgb(46, 45, 46);
  padding: 20px 0 50px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  box-shadow: 0 5px 30px 0.5px var(--dark-accent);
`;
const SubText = styled.span`
  background: transparent;
  font-style: italic;
  font-weight: normal;
  margin-left: 20px;
  font-size: 16px;
`;
const RecipeInfoWrapper = styled.div`
  position: relative;
  z-index: 1;
  background: transparent;
`;
const RecipeDescription = styled.div`
  margin: 50px 25px 50px 25px;
  padding: 5px;
  border-radius: 5px;
  border: 2px solid var(--dark-accent);
  box-shadow: 0 0 10px 0.1px var(--slight-box-shadow);
  background: rgb(127, 57, 251, 0.2);
  max-height: 200px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 2px;
  }
`;
const Ingredients = styled.div`
  background: transparent;
  font-weight: bold;
  margin-left: 20px;
`;
const IngredientsItemsList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: flex-start;
  list-style-type: none;
`;

const StepsWrapper = styled.div`
  font-size: 30px;
  border-top: none;
  padding: 50px 20px;
  background: var(--app-bg-color-theme);
  text-shadow: 0 0 10px rgb(46, 45, 46);
  color: white;
`;

const StepNumber = styled.div`
  font-size: 30px;
  position: absolute;
  left: -35px;
  top: -2px;
`;
const StepsItemList = styled.ul`
  list-style-type: none;
`;
const StepBorder = styled.div`
  margin: 10px 0;
  opacity: 0.5;
  border: 2px solid var(--dark-accent);
  border-radius: 5px;
  width: 95%;
`;
const StepItem = styled.li`
  font-size: 18px;
`;

const StepWrapper = styled.div`
  position: relative;

  font-size: 25px;
`;

const Wrapper = styled.div`
  font-size: 22px;
  position: relative;
`;

export default Recipes;
