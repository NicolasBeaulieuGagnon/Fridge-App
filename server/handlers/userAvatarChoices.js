const defaultUserAvatars = require("../helpers/defaultUserAvatars.json");

const getAllStoredAvatarChoices = (req, res) => {
  res.status(200).json({ status: 200, data: defaultUserAvatars });
};

module.exports = { getAllStoredAvatarChoices };
