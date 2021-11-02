import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AiOutlineCloseCircle } from "react-icons/ai";

import NotStyledButton from "../../buttons/NoStyledButton";

const SavedRecipe = ({ removeRecipe, recipe }) => {
  const { _id, title, image } = recipe;

  return (
    <Wrapper>
      <RemoveButton
        onClick={() => {
          removeRecipe(recipe);
        }}
      >
        <AiOutlineCloseCircle size={20} />
      </RemoveButton>
      <Title>{title}</Title>
      <StyledLink to={`/recipe/${_id}`}>
        <ImageWrapper>
          <Image src={image} alt={title} />
        </ImageWrapper>
      </StyledLink>
    </Wrapper>
  );
};

const RemoveButton = styled(NotStyledButton)`
  padding: 0;
  position: absolute;
  top: 1px;
  right: 1px;
  color: rgb(214, 55, 49);
`;

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

const Wrapper = styled.div`
  position: relative;
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

const StyledLink = styled(Link)`
  text-decoration: none;
`;

export default SavedRecipe;
