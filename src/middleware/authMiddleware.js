const jwt = require("jsonwebtoken");
const User = require('../Models/user')
require("dotenv").config();

let generateToken = (user, secretSignature, tokenLife, refreshTokenLife) => {
  return new Promise((resolve, reject) => {
    // Tạo access token
    jwt.sign(
      { data: user },
      secretSignature,
      {
        algorithm: "HS256",
        expiresIn: tokenLife,
      },
      (error, token) => {
        if (error) {
          return reject(error);
        }
        // Tạo refresh token
        jwt.sign(
          { data: user },
          secretSignature,
          {
            algorithm: "HS256",
            expiresIn: refreshTokenLife,
          },
          (error, refreshToken) => {
            if (error) {
              return reject(error);
            }
            resolve({
              accessToken: token,
              accessTokenLife: tokenLife,
              refreshToken: refreshToken,
              refreshTokenLife: refreshTokenLife,
            });
          }
        );
      }
    );
  });
};

let verifyToken = (token, secretKey) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (error, decoded) => {
      if (error) {
        return reject(error);
      }
      resolve(decoded);
    });
  });
};

let isAuthen = async (req, res, next) => {
  const tokenFromClient = req.headers["authorization"]?.split(" ")[1];
  const refreshTokenFromClient = req.headers["x-refresh-token"];

  if (!tokenFromClient) {
    return res.status(403).json({
      message: "No token provided",
    });
  }

  try {
    // Verify access token
    const decoded = await verifyToken(tokenFromClient, process.env.ACCESS_TOKEN);
    const id = decoded.data._id;
    const loggedUser = await User.findById(id);
    req.user = loggedUser;
    next();
  } catch (error) {
    // If access token is expired and refresh token is provided
    if (error.name === 'TokenExpiredError' && refreshTokenFromClient) {
      try {
        // Verify refresh token
        const decoded = await verifyToken(refreshTokenFromClient, process.env.REFRESH_TOKEN);
        const id = decoded.data._id;
        const loggedUser = await User.findById(id);

        if (!loggedUser) {
          return res.status(401).json({
            message: "User not found",
          });
        }

        // Generate new tokens
        const tokens = await generateToken(
          loggedUser,
          process.env.ACCESS_TOKEN,
          process.env.ACCESS_TOKEN_LIFE,
          process.env.REFRESH_TOKEN_LIFE
        );

        // Set new tokens in response headers
        res.setHeader('x-access-token', tokens.accessToken);
        res.setHeader('x-refresh-token', tokens.refreshToken);

        // Set user in request
        req.user = loggedUser;
        next();
      } catch (refreshError) {
        return res.status(401).json({
          message: "Invalid refresh token",
        });
      }
    } else {
      return res.status(401).json({
        message: "Unauthorized: Invalid or expired token",
      });
    }
  }
};

const authorization = (req, res, next) => {
  if (req.user.role === 'admin')
    next();
  else {
    return res.status(401).json({ message: 'You are not authorization' })
  }
}

module.exports = {
  generateToken,
  isAuthen,
  verifyToken,
  authorization
}