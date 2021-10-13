import React from "react";
import styled from "styled-components";

import FoundRecipes from "./FoundRecipes";

const RecipeDisplay = ({ foundRecipes }) => {
  return (
    <Wrapper showRecipe={foundRecipes.length > 0}>
      <TitleWrapper id="resultsTitle">Your results</TitleWrapper>

      <RecipeWrapper>
        {foundRecipes.length > 0 ? (
          foundRecipes.map((item, index) => {
            return <FoundRecipes key={`recipe-${index}`} item={item} />;
          })
        ) : (
          <div></div>
        )}
      </RecipeWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  height: 100vh;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: -1;
  overflow-x: hidden;
  opacity: ${({ showRecipe }) => (showRecipe ? "1" : "0")};
`;

const RecipeWrapper = styled.div``;

const TitleWrapper = styled.div`
  background: var(--app-bg-color-theme);
  color: white;
  display: flex;
  justify-content: stretch;
  flex-direction: column;
  align-items: center;
  padding-top: 10%;
  padding-bottom: 20px;
  font-size: 30px;
  text-shadow: 0 0 10px rgb(46, 45, 46);
  margin-bottom: 20px;
  box-shadow: 0 0 20px 10px grey;
`;

export default RecipeDisplay;
