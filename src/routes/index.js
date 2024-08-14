const userRouter = require('./userRouter');
const router = require('./userRouter');
const petRouter = require('./petRouter');
const routers = (app)=>{
    app.use('/user', userRouter)
    app.use('/pet', petRouter);
}

module.exports = routers