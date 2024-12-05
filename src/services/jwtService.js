const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const generateAccessToken = (payload) => {
  const access_token = jwt.sign({ payload }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "24h",
  });

  return access_token;
};

const generateRefreshToken = (payload) => {
  console.log(payload);
  const access_token = jwt.sign({ payload }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "365d",
  });

  return access_token;
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};