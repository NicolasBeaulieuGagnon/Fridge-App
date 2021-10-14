import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SavedRecipe = ({ recipe }) => {
  const { _id, title, image } = recipe;

  return (
    <StyledLink to={`/recipe/${_id}`}>
      <Title>{title}</Title>
      <ImageWrapper>
        <Image src={image} alt={title} />
      </ImageWrapper>
    </StyledLink>
  );
};

const Image = styled.img`
  width: 100%;
  border-radius: 2px;
`;
const ImageWrapper = styled.div`
  max-width: 200px;
`;
const Title = styled.div`
  width: 180px;
  text-align: center;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  background: rgb(127, 57, 251, 0.2);
  padding: 10px;
  color: black;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 200px;
  margin: 5px;
`;

export default SavedRecipe;
