const express = require("express");
const homeRouter = require("./home.router");
const petRouter = require("./pet.router");
const categoryRouter = require("./category.router");
const uploadRouter = require("./upload.router");
const userRouter = require("./user.router");
const cartRouter = require("./cart.router");
const notificationRouter = require("./notification.router");
const orderRouter = require("./order.router");
const reviewRouter = require("./review.router");
const authRouter = require("./auth.router");
const middleware = require("../../middleware/authMiddleware");
const brandRouter = require("./brand.router");
const accessoryRouter = require('./accessory.router')
const foodRouter = require('./food.router')

const routers = (app) => {
  const path = "/api/v1/admin";
  app.use(
    path + "/home",
    middleware.isAuthen,
    middleware.authorization,
    homeRouter
  );
  app.use(
    path + "/pet",
    middleware.isAuthen,
    middleware.authorization,
    petRouter
  );
  app.use(
    path + "/upload",
    middleware.isAuthen,
    middleware.authorization,
    uploadRouter
  );
  app.use(
    path + "/category",
    middleware.isAuthen,
    middleware.authorization,
    categoryRouter
  );
  app.use(
    path + "/user",
    middleware.isAuthen,
    middleware.authorization,
    userRouter
  );
  app.use(
    path + "/cart",
    middleware.isAuthen,
    middleware.authorization,
    cartRouter
  );
  app.use(
    path + "/notification",
    middleware.isAuthen,
    middleware.authorization,
    notificationRouter
  );
  app.use(
    path + "/order",
    middleware.isAuthen,
    middleware.authorization,
    orderRouter
  );
  app.use(
    path + "/review",
    middleware.isAuthen,
    middleware.authorization,
    reviewRouter
  );
  app.use(
    path + "/auth",
    middleware.isAuthen,
    middleware.authorization,
    authRouter
  );
  app.use(
    path + "/brand",
    middleware.isAuthen,
    middleware.authorization,
    brandRouter
  );
  app.use(
    path + "accessory",
    middleware.isAuthen,
    middleware.authorization,
    accessoryRouter
  );
  app.use(
    path + "/food",
    middleware.isAuthen,
    middleware.authorization,
    foodRouter
  );
};

module.exports = routers;
