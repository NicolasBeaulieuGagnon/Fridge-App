require("dotenv").config();
const { SPOON_API_KEY } = process.env;

const getApiKey = (req, res) => {
  return res.status(200).json({ status: 200, data: SPOON_API_KEY });
};

module.exports = {
  getApiKey,
};
