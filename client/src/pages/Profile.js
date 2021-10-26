import React, { useContext } from "react";
import styled, { keyframes } from "styled-components";

import UserBanner from "../components/profileHelpers/UserBanner";
import SavedRecipe from "../components/profileHelpers/SavedRecipe";
import { UserContext } from "../components/contexts/UserContext";

const Profile = () => {
  const { user } = useContext(UserContext);

  return (
    <Wrapper>
      <UserBanner user={user} />
      <Border />
      <Title>My Recipes</Title>
      <RecipesWrapper>
        {user?.recipes?.map((recipe, index) => {
          return <SavedRecipe key={index} recipe={recipe} />;
        })}
      </RecipesWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: calc(100vh - 70px);
  overflow: scroll;
`;

const Title = styled.div`
  margin-left: 5%;
  font-weight: bold;
  font-size: 20px;
  border-bottom: 2px solid rgb(0, 0, 0, 0.2);
  margin-right: 5%;
  padding-bottom: 5px;
`;

const Border = styled.div`
  background: var(--app-bg-color-theme);
  width: 90%;
  height: 5px;
  margin: 35px 5% 10px;
  opacity: 0.5;
  border-radius: 2px;
`;

const RecipesWrapper = styled.div`
  margin: 5%;
  margin-bottom: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  background: rgb(0, 0, 0, 0.1);
  border-radius: 2px;
  overflow: scroll;
  height: calc(56vh - 80px);
`;

export default Profile;
