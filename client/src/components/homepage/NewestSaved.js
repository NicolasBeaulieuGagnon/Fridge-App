import React, { useState, useEffect } from "react";
import styled from "styled-components";

const NewestSaved = ({ user }) => {
  const [recipe, setRecipe] = useState(null);
  const [laoding, setLoading] = useState(true);

  useEffect(() => {
    if (user._id && user.recipes.length > 0) {
      let recipeId = user.recipes[user.recipes.length - 1]._id;
      fetch(`/getApiKey`).then((res) => {
        res.json().then((data) => {
          const url = `https://api.spoonacular.com/recipes/${recipeId}/information?includeNutrition=false&apiKey=${data.data}`;
          fetch(url).then((res) =>
            res.json().then((data) => {
              setRecipe(data);
              setLoading(false);
            })
          );
        });
      });
    }
  }, [user]);
  return <Wrapper></Wrapper>;
};

const Wrapper = styled.div``;

const RecipeImage = styled.img``;

const ImageWrapper = styled.div``;

const Title = styled.div``;

const InfoWrapper = styled.ul``;

const Info = styled.li``;

export default NewestSaved;
