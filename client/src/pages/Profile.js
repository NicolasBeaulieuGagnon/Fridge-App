import React, { useContext } from "react";
import styled, { keyframes } from "styled-components";

import UserBanner from "../components/profileHelpers/UserBanner";
import SavedRecipes from "../components/profileHelpers/SavedRecipes";
import { UserContext } from "../components/contexts/UserContext";

const Profile = () => {
  const { user } = useContext(UserContext);

  return (
    <Wrapper>
      <UserBanner user={user} />
      <SavedRecipes recipes={user.recipes} />
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default Profile;
