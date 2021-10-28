import React, { useContext, useState } from "react";
import styled, { keyframes } from "styled-components";

import UserBanner from "../components/profileHelpers/UserBanner";
import SavedRecipe from "../components/profileHelpers/SavedRecipe";
import { UserContext } from "../components/contexts/UserContext";

const Profile = () => {
  //changes from 3 states, none, removed, removing...
  const [removing, setRemoving] = useState("none");
  const [hiddenDiv, setHiddenDiv] = useState(true);

  const { user, setUpdateUser, updateUser } = useContext(UserContext);

  const removeRecipe = (recipe) => {
    setHiddenDiv(false);
    setTimeout(() => {
      setRemoving("Removing...");
    }, 50);
    fetch(`/user/recipeBook/editRecipes`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ type: "remove", recipe, _id: user._id }),
    }).then((res) => {
      res.json().then((data) => {
        setTimeout(() => {
          setRemoving(data.message);
          setUpdateUser(!updateUser);
        }, 100);
        setTimeout(() => {
          setRemoving("none");
        }, 400);
        setTimeout(() => {
          setHiddenDiv(true);
        }, 500);
      });
    });
  };

  return (
    <Wrapper>
      <RemoveDiv
        state={removing === "Removing..."}
        visable={removing !== "none"}
        hidden={hiddenDiv}
      >
        {removing}
      </RemoveDiv>

      <UserBanner user={user} />
      <Border />
      <Title>My Recipes</Title>
      <RecipesWrapper>
        {user?.recipes?.map((recipe, index) => {
          if (recipe._id) {
            return (
              <SavedRecipe
                removeRecipe={removeRecipe}
                key={index}
                recipe={recipe}
              />
            );
          }
        })}
      </RecipesWrapper>
    </Wrapper>
  );
};

const RemoveDiv = styled.div`
  border-radius: 4px;
  text-shadow: 0 0 19px black;
  box-shadow: 0 0 10px 4px black;
  border: ${({ state }) =>
    state ? " 2px solid rgb(153, 12, 27)" : "2px solid rgb(5, 135, 23)"};
  opacity: ${({ visable }) => (visable ? "1" : "0")};
  display: ${({ hidden }) => (hidden ? "none" : "block")};
  position: absolute;
  left: ${({ visable }) => (visable ? "50%" : "100%")};
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  font-weight: bold;
  font-size: 19px;
  z-index: 50;
  background: ${({ state }) =>
    state ? "rgb(240, 38, 60)" : "rgb(2, 207, 30)"};
  transition: opacity 0.5s ease-in-out, left 0.3s ease-in-out;
`;

const Wrapper = styled.div`
  position: relative;
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
