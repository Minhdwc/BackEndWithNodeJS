const express = require('express')
const homeRouter = require('./home.router');
const petRouter = require('./pet.router');
const categoryRouter = require('./category.router');
const uploadRouter = require('./upload.router');
const userRouter = require('./user.router')
const cartRouter = require('./cart.router');
const notificationRouter = require('./notification.router');
const orderRouter = require('./order.router');
const reviewRouter = require('./review.router')
const authRouter = require('./auth.router')
const brandRouter = require('./brand.router')
const accessoryRouter = require('./accessory.router')
const foodRouter = require('./food.router')

const routers = (app)=>{
    const path = '/api/v1';
    app.use(path + '/home', homeRouter);
    app.use(path + '/pet', petRouter);
    app.use(path + '/upload', uploadRouter);
    app.use(path + '/category', categoryRouter)
    app.use(path + '/user', userRouter)
    app.use(path + '/cart', cartRouter)
    app.use(path + '/notification', notificationRouter)
    app.use(path + '/order', orderRouter)
    app.use(path + '/review', reviewRouter)
    app.use(path + '/auth', authRouter)
    app.use(path + '/brand', brandRouter)
    app.use(path + '/accessory', accessoryRouter)
    app.use(path + '/food', foodRouter)
}

module.exports = routers;