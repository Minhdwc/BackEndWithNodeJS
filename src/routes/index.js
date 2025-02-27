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

const routers = (app)=>{
    app.use('/home', homeRouter);
    app.use('/pet', petRouter);
    app.use('/upload', uploadRouter);
    app.use('/category', categoryRouter)
    app.use('/user', userRouter)
    app.use('/cart', cartRouter)
    app.use('/notification', notificationRouter)
    app.use('/order', orderRouter)
    app.use('/review', reviewRouter)
    app.use('/auth', authRouter)
}

module.exports = routers;