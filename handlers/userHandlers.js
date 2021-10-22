const { v4: uuidv4 } = require("uuid");
const { MongoClient } = require("mongodb");
const assert = require("assert");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const RealRemoveUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  console.log("connected");
  const { _id, key } = req.params;
  try {
    const query = { _id, recoveryKey: key };
    const db = client.db("My-Fridge-app");

    const result = await db.collection("users").deleteOne({ ...query });
    assert.strictEqual(1, result.deletedCount);
    res.status(200).json({
      status: 200,
      data: result,
      message: "user has been permanently deleted.",
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      data: err,
      message: "something went wrong. This account might already be deleted.",
    });
  }

  client.close();
  console.log("disconnected");
};

const FakeRemoveUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  console.log("connected");

  try {
    const { _id } = req.params;
    const db = client.db("My-Fridge-app");

    const recoveryKey = `${_id}-${uuidv4()}`;
    const newValue = { $set: { accountDeleted: true, recoveryKey } };
    const query = { _id };

    const result = await db.collection("users").updateOne(query, newValue);
    assert.strictEqual(1, result.modifiedCount);

    return res.status(200).json({
      status: 200,
      data: recoveryKey,
      message: "account has been deleted.",
    });
  } catch (err) {
    console.log(err);
    const { _id } = req.params;
    res.status(404).json({
      status: 404,
      error: err,
      data: _id,
      message: "user does not exist or is already deleted.",
    });
  }

  client.close();
  console.log("disconnected");
};

const AccountRecovery = async (req, res) => {
  const { key } = req.params;
  const client = new MongoClient(MONGO_URI, options);

  await client.connect();
  console.log("connected");

  try {
    const db = client.db("My-Fridge-app");

    const query = { recoveryKey: key };
    const newValue = { $set: { accountDeleted: false, recoveryKey: false } };

    const result = await db.collection("users").updateOne(query, newValue);
    assert.strictEqual(1, result.modifiedCount);
    res.status(202).json({
      status: 202,
      data: result.document,
      message: "account recovered. you no longer need the recovery key.",
    });
  } catch (err) {
    res
      .status(404)
      .json({ status: 404, data: err, message: "no account found" });
  }

  client.close();
  console.log("disconnected");
};

const CreateUser = async (req, res) => {
  const { firstName, lastName, email, userName, password, avatarSrc } =
    req.body;
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  console.log("connected");

  try {
    const _id = uuidv4();
    const joined = new Date();
    const friends = [];
    const recipes = [];

    const newUser = {
      _id,
      firstName,
      lastName,
      email,
      userName,
      password,
      avatarSrc,
      joined,
      friends,
      recipes,
    };

    const db = client.db("My-Fridge-app");

    const results = await db.collection("users").insertOne({ ...newUser });
    assert(_id, results.insertedId);

    return res.status(201).json({
      status: 201,
      data: { ...newUser },
      message: "New user created.",
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({ status: 404, data: { ...newUser }, message: err });
  } finally {
    client.close();
    console.log("disconnected");
  }
};

const GetAllUsers = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  console.log("connected");

  try {
    const db = client.db("My-Fridge-app");

    const results = await db.collection("users").find().toArray();

    results.length > 0
      ? res.status(200).json({ status: 200, data: results })
      : res.status(404).json({ status: 404, data: results });
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
    console.log("disconnected");
  }
};

const GetUserById = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  console.log("connected");

  try {
    const db = client.db("My-Fridge-app");

    const result = await db
      .collection("users")
      .findOne({ _id: req.params._id });

    if (result) {
      return res
        .status(202)
        .json({ status: 202, data: result, message: "user found" });
    } else {
      return res.status(404).json({
        status: 404,
        data: req.params._id,
        message: "No user found at the given id",
      });
    }
  } catch (err) {
    res.status(400).json({ status: 400, data: err, message: "uh oh" });
  } finally {
    client.close();
    console.log("disconnected");
  }
};

const EditUserById = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const { _id } = req.params;
  const { firstName, lastName, email, userName, password, avatarSrc } =
    req.body;

  await client.connect();
  console.log("connected");

  try {
    const db = client.db("My-Fridge-app");
    const user = await db.collection("users").findOne({ _id });
    const query = { _id };
    const newValue = {
      $set: {
        firstName: `${firstName ? firstName : user.firstName}`,
        lastName: `${lastName ? lastName : user.lastName}`,
        email: `${email ? email : user.email}`,
        userName: `${userName ? userName : user.userName}`,
        password: `${password ? password : user.password}`,
        avatarSrc: `${avatarSrc ? avatarSrc : user.avatarSrc}`,
      },
    };
    await db.collection("users").updateOne(query, newValue);
    res
      .status(200)
      .json({ status: 200, data: newValue, message: "changes made!" });
  } catch (err) {
    console.log(`SOMETHING WENT TERRIBLY WRONG--- ${err}`);
  } finally {
    client.close();
    console.log("disconnected");
  }
};

const getUserByLogin = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  console.log("connected");

  try {
    const { userName, password } = req.params;
    const db = client.db("My-Fridge-app");

    const result = await db.collection("users").findOne({ userName, password });
    if (result?.userName) {
      return res.status(202).json({ status: 202, data: result });
    } else {
      res.status(404).json({ status: 404, message: "user not found." });
    }
  } catch (err) {
    res.status(400).json({ status: 400, message: "something went wrong..." });
  } finally {
    client.close();
    console.log("disconnected");
  }
};

const EditRecipes = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  console.log("connected");

  const { type, recipe, _id } = req.body;

  try {
    const db = client.db("My-Fridge-app");
    switch (type) {
      case "add":
        await db
          .collection("users")
          .updateOne({ _id }, { $addToSet: { recipes: recipe } });

        return res.status(202).json({ status: 202, message: "recipe added!" });
      case "remove":
        await db
          .collection("users")
          .updateOne({ _id }, { $pull: { recipes: recipe } });
        return res
          .status(202)
          .json({ status: 202, message: "recipe removed!" });

      default:
        res.status(400).json({
          status: 400,
          data: { type, recipe, _id },
          message: "something went wrong.",
        });
    }
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
    console.log("disconnected");
  }
};

module.exports = {
  CreateUser,
  RealRemoveUser,
  FakeRemoveUser,
  AccountRecovery,
  GetAllUsers,
  GetUserById,
  EditUserById,
  getUserByLogin,
  EditRecipes,
};
