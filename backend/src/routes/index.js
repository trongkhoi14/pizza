const { notFound, errorHandler } = require("../middlewares/errorHandler")
const productCategoryRouter = require('./productCategory')
const sizeRouter = require('./size')
const userRouter = require('./user')
const employeeRouter = require('./employee')
const productRouter = require('./product')
const orderRouter = require('./order');
const notifyRouter = require('./notify');
//const socketRouter = require('./socket');

const initRoutes = (app) => {

    app.use('/api/v1/user', userRouter)
    app.use('/api/v1/employee', employeeRouter)
    app.use('/api/v1/product-category', productCategoryRouter)
    app.use('/api/v1/size', sizeRouter)
    app.use('/api/v1/product', productRouter)
    app.use('/api/v1/order', orderRouter)
    app.use('/api/v1/notify', notifyRouter)
    //app.use('/api/v1/socket', socketRouter)

    app.use(notFound)
    app.use(errorHandler)
}

module.exports = initRoutes