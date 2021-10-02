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
} = require("./handlers/userHandlers");

const PORT = 8000;

express()
  .use(morgan("dev"))
  .use(express.json())

  //GET - getting all users
  .get(`/users`, GetAllUsers)
  //GET -getting user by id
  .get("/user/:_id", GetUserById)
  //GET -get user by login info
  .get("/user/userName/:userName/password/:password", getUserByLogin)
  //POST - creating a new user
  .post(`/user`, CreateUser)
  //PATCH - recovering fake deleted account
  .patch(`/user/key/:key`, AccountRecovery)
  //PATCH - fake delete/restore of an account
  .patch(`/user/delete/:_id`, FakeRemoveUser)
  //PATCH - edit user information
  .patch(`/user/:_id`, EditUserById)
  //DELETE - real account deletion
  .delete(`/user/:_id/key/:key`, RealRemoveUser)

  //GET - get API key from BE to use on the FE
  .get(`/getApiKey`, getApiKey)

  // GET all default avatar  choices
  .get("/avatarChoice", getAllStoredAvatarChoices)

  .listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  });
