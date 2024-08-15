const userRouter = require('./userRouter');
const router = require('./userRouter');
const petRouter = require('./petRouter');
const foodRouter = require('./foodRouter');
const routers = (app)=>{
    app.use('/user', userRouter)
    app.use('/pet', petRouter);
    app.use('/food', foodRouter)
}

module.exports = routers