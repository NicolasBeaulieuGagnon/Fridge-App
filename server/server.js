const express = require("express");
const morgan = require("morgan");

const { getApiKey } = require("./handlers/spoonApi");
const { getAllStoredAvatarChoices } = require("./handlers/userAvatarChoices");

const {
  CreateUser,
  RealRemoveUser,
  FakeRemoveUser,
  AccountRecovery,
  GetAllUsers,
  GetUserById,
  EditUserById,
  getUserByLogin,
  EditRecipes,
} = require("./handlers/userHandlers");

const PORT = process.env.PORT || 8000;

const app = express();
app.use(morgan("dev"));
app.use(express.json());

//GET - getting all users
app.get(`/users`, GetAllUsers);
//GET -getting user by id
app.get("/user/:_id", GetUserById);
//GET -get user by login info
app.get("/user/userName/:userName/password/:password", getUserByLogin);
//POST - creating a new user
app.post(`/user`, CreateUser);
//PATCH - recovering fake deleted account
app.patch(`/user/key/:key`, AccountRecovery);
//PATCH - fake delete/restore of an account
app.patch(`/user/delete/:_id`, FakeRemoveUser);
//PATCH - edit user information
app.patch(`/user/:_id`, EditUserById);
//PATCH - edit user saved recipes
app.patch(`/user/recipeBook/editRecipes`, EditRecipes);
//DELETE - real account deletion
app.delete(`/user/:_id/key/:key`, RealRemoveUser);

//GET - get API key from BE to use on the FE
app.get(`/getApiKey`, getApiKey);

// GET all default avatar  choices
app.get("/avatarChoice", getAllStoredAvatarChoices);

console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV !== "production") {
  app.use(express.static("../client/build"));
}

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
