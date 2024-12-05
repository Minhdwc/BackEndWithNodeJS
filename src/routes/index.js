const express = require("express");
const userRouter = require("./userRouter");
const petRouter = require("./petRouter");
const homeRouter = require("./homeRouter");

const routers = (app) => {
	app.use("/", homeRouter);
	app.use("/pet", petRouter);
	app.use("/user", userRouter);
};

module.exports = routers;
