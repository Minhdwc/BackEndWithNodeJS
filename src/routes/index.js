const express = require('express')
const homeRouter = require('./homeRouter');
const petRouter = require('./petRouter');
const categoryRouter = require('./categoryRouter');
const uploadRouter = require('./uploadRouter');
const userRouter = require('./userRouter')
const cartRouter = require('./cartRouter');
const notificationRouter = require('./notificationRouter');
const orderRouter = require('./orderRouter');
const reviewRouter = require('./reviewRouter')

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
}

module.exports = routers;