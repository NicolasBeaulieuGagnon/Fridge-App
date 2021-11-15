import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const FoundRecipes = ({ item }) => {
  return (
    <RecipeWrapper key={item.id}>
      <StyledLink to={`/recipe/${item.id}`}>
        <Title>{item.title}</Title>
      </StyledLink>
      <StyledLink to={`/recipe/${item.id}`}>
        <ImageWrapper>
          <Image src={item.image} />
        </ImageWrapper>
      </StyledLink>
      <InfoWrapper>
        {item.usedIngredients.length > 0 && (
          <InfoTitle>
            Ingredients in your fridge:
            <Info>
              {item.usedIngredients.map((usedIng) => {
                return <IngredientDetail>{usedIng.name}</IngredientDetail>;
              })}
            </Info>
          </InfoTitle>
        )}
        {item.missedIngredients.length > 0 && (
          <InfoTitle>
            Not in your fridge:
            <Info>
              {item.missedIngredients.map((missedIng) => {
                return <IngredientDetail>{missedIng.name}</IngredientDetail>;
              })}
            </Info>
          </InfoTitle>
        )}
      </InfoWrapper>
    </RecipeWrapper>
  );
};

const IngredientDetail = styled.div``;

const InfoWrapper = styled.div`
  padding-top: 10px;
  font-weight: bold;
`;
const Info = styled.div`
  font-weight: normal;
  padding-left: 20px;
  font-style: italic;
  &:hover {
    overflow-x: auto;
  }
`;
const InfoTitle = styled.div``;
const RecipeWrapper = styled.div`
  font-size: 20px;
  display: flex;
  flex-direction: column;
  width: 260px;
  height: 450px;
  transition: 600ms ease;
  border-radius: 5px;
  align-items: center;
  padding: 15px;
  margin: 20px;
  box-shadow: 0 0 5px 1px rgb(0, 0, 0, 0.2);
  background: rgb(235, 235, 235);
`;
const Title = styled.div`
  font-size: 25px;
  font-weight: bold;
  padding: 10px 0 10px 20px;
  transition: 0.2s ease-in-out;
  &:hover {
    text-shadow: 0 0 20px var(--dark-accent);
  }
`;
const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 250px;
  margin-left: 2%;
  margin-bottom: 10px;
  border: 2px solid var(--primary-border-color);
  box-shadow: 1px 1px 10px 0.1px var(--slight-box-shadow);

  border-radius: 2px;
  overflow: hidden;
`;
const Image = styled.img`
  width: 100%;
  transition: 0.1s ease-in-out;
  &:hover {
    transform: rotate(5deg) scale(1.1);
  }
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

export default FoundRecipes;
