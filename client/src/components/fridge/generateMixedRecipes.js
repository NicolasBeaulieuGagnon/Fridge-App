export const mixRecipes = (array, amount) => {
  let newArray = [];
  for (let i = 0; i < amount; i++) {
    const randomNum = Math.floor(Math.random() * amount);

    newArray.push(array.splice(randomNum, 1)[0]);
  }

  console.log(newArray);
  return newArray;
};
