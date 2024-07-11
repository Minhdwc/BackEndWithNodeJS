const userRouter = require('./userRouter');
const router = require('./userRouter');
const routers = (app)=>{
    app.use('/', userRouter)
}

module.exports = routers