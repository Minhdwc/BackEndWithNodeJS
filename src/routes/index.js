const express = require('express');
const userRouter = require('./userRouter');
const petRouter = require('./petRouter');
const foodRouter = require('./foodRouter');
const homeRouter = require('./homeRouter');

const routers = (app) => {
    app.use('/', homeRouter);
    app.use('/pet', petRouter);
    app.use('/food', foodRouter);
    app.use('/user', userRouter);
}

module.exports = routers;
