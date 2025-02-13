const express = require('express')
const homeRouter = require('./homeRouter');
const petRouter = require('./petRouter');
const categoryRouter = require('./categoryRouter');
const uploadRouter = require('./uploadRouter');
const multer = require('multer');

const routers = (app)=>{
    app.use('/home', homeRouter);
    app.use('/pet', petRouter);
    app.use('/upload', uploadRouter);
    app.use('/category', categoryRouter)
}

module.exports = routers;