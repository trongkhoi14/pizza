const asyncHandler = require('express-async-handler')
const Order = require('../models/Order')
const Size = require('../models/Size')
const User = require('../models/User')
const Employee = require('../models/Employee')
const Coupon = require('../models/Coupon')
const uid = require('../utils/shortuniqueid');
const Product = require('../models/Product');
const Notify = require('../models/Notify')
const mailer = require('../utils/mailer');

/*
const createUserOrder = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const {name, email, mobile, address, description, method, coupon, payment, saveAddress} = req.body
    if (!name || !email || !mobile || !address || !method || !method.name || !method.hour || !payment) {
        return res.status(200).json({
            status: false,
            data: 'Missing inputs'
        })
    }
    const userCart = await User.findById(_id).select('cart').populate('cart.product', '_id title category price sizes salePercent image').populate('cart.size', '_id title')

    let products = []
    let cart = userCart?.cart;
    let totalPrice = 0;
    let totalProduct = cart.length;
    if (totalProduct < 1) {
        return res.json({
            status: false,
            data: "Order must have at least one product.",
        })
    }
    for(let i = 0; i < totalProduct; i++) {
        products.push({
            product: cart[i].product,
            size: cart[i].size || null,
            quantity: +cart[i].quantity
        })
        var percent = +cart[i].product.salePercent
        var itemQty = +cart[i].quantity
        if (cart[i].size) {
            for (let j = 0; j < cart[i].product.sizes.length; j++) {
                if (cart[i].size._id.toString() === cart[i].product.sizes[j].size.toString()) {
                    var price = +cart[i].product.sizes[j].price
                    if (percent > 0) {
                        totalPrice +=  (price - (price * percent / 100)) * itemQty;
                    } else {
                        totalPrice += price * itemQty;
                    }
                    break;
                }
            }
        } else {
            if (percent > 0) {
                totalPrice +=  +cart[i].product.price - (+cart[i].product.price * percent / 100) * itemQty;
            } else {
                totalPrice += +cart[i].product.price * itemQty;
            }
        }
    }

    const createData = {products, orderId: "#" + uid(), orderBy: _id, 
                        totalProduct, totalPrice, payment,
                        name, mobile, email, address, description, method
                    }
    if (coupon) {
        const selectedCoupon = await Coupon.findById(coupon);
        totalPrice = Math.round(totalPrice * (1 - +selectedCoupon.discount / 100) / 1000)*1000 || totalPrice
        createData.totalPrice = totalPrice
        createData.coupon = coupon
    }
    
    const rs = await Order.create(createData).populate('products.product', '_id title price salePercent image sizes');
    userCart.cart = []
    if (saveAddress && saveAddress === true) {
        userCart.address = address;
    }
    await userCart.save();
    return res.json({
        status: rs ? true: false,
        data: rs ? rs:"Something went wrong",
    })
}) 
*/
const createOrder = asyncHandler(async (req, res) => {
    
    const {cart, name, email, mobile, address, description, method, coupon, payment, shippingFee} = req.body
    if (!name || !email || !mobile || !address || !method || !method.name || !method.hour || !payment || !shippingFee) {
        return res.status(200).json({
            status: false,
            data: 'Missing inputs'
        })
    }
    if ((typeof cart !== 'undefined' && cart.length === 0) || cart === undefined) {
        return res.json({
            status: false,
            data: "Order must have at least one product.",
        })
    }
    // based on the mobile phone, we can find if a user has already existed with this number phone
    const user = await User.findOne({mobile: mobile})
    let products = [];
    let totalPrice = 0;
    let totalProduct = cart.length;

    for(let i = 0; i < totalProduct; i++) {
        const p = await Product.findById(cart[i]._id);
        if (!p) {
            return res.json({
                status: false,
                data: "Product not found.",
            })
        }
        let hasSize = true
        if ((typeof p.sizes !== 'undefined' && p.sizes.length === 0) || p.sizes === undefined) {
            hasSize = false
        }
        if (hasSize === true && !cart[i].size) {
            return res.status(400).json({
                status: false,
                data: "You do not provide the size, while the product has the size."
            })
        }
        if (typeof(cart[i].quantity) !== 'number' || +cart[i].quantity < 1) {
            return res.status(400).json({
                status: false,
                data: "You provide the wrong quantity of a product."
            })
        }
        var percent = +p.salePercent
        var itemQty = +cart[i].quantity
        if (hasSize === false) {
            products.push({
                product: p._id,
                size: cart[i].size || null,
                quantity: itemQty
            })
            if (percent > 0) {
                totalPrice +=  +p.price - (+p.price * percent / 100) * itemQty;
            } else {
                totalPrice += +p.price * itemQty;
            }
        } else {
            const existedSize = await Size.findById(cart[i].size);
            
            if (!existedSize) {
                return res.status(200).json({
                    status: false,
                    data: `The size with _id = ${cart[i].size} does not exist`
                })
            }
            products.push({
                product: p._id,
                size: existedSize._id || null,
                quantity: itemQty
            })
            for (let j = 0; j < p.sizes.length; j++) {
                if (existedSize._id.toString() === p.sizes[j].size.toString()) {
                    var price = +p.sizes[j].price
                    if (percent > 0) {
                        totalPrice +=  (price - (price * percent / 100)) * itemQty;
                    } else {
                        totalPrice += price * itemQty;
                    }
                    break;
                }
            }
        }
    }
    const orderId = "#" + uid();
    const createData = {products, orderId: orderId,
                        totalProduct, totalPrice, payment, orderBy: user?user._id:null,
                        name, mobile, email, address, description, method, shippingFee
                    }
    if (coupon) {
        const selectedCoupon = await Coupon.findById(coupon);
        totalPrice = Math.round(totalPrice * (1 - +selectedCoupon.discount / 100) / 1000)*1000 || totalPrice
        createData.totalPrice = totalPrice
        createData.coupon = coupon
    }
    if (+shippingFee >= 0) {
        createData.totalPrice = totalPrice + +shippingFee
    }
    
    const rs = await Order.create(createData)
    // for notifications
    const createdAt = rs.createdAt;
    let time = createdAt.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }, 
        {day:'numeric', month: 'long', year:'numeric', hour: 'numeric', minute: 'numeric', 
        second: 'numeric'})
    const recipients = await Employee.find({role: {$ne: 'staff'}}).select('_id')
    let notifyData = {
        title: orderId, content: `${orderId} - New order`, 
        status: false, time: time,
        recipients: recipients
    }
    // send mail
    const data = {
        emailAdmin: process.env.EMAIL_ADMIN,
        emailCustomer: email,
        deliveryTime: time,
        order: rs
    }
    await mailer.alarmOrder(data)
    // notify
    const notify = await Notify.create(notifyData)
    notifyData._id = notify?notify._id:null
    _io.emit('new-order', notifyData)
    return res.status(201).json({
        status: rs ? true: false,
        data: rs ? rs:"Something went wrong",
        time
    })
}) 


/*
const customOrderResult = (products) => {
    let returnData = []
    // products must be an array and only server for order controller
    if ((typeof products !== 'undefined' && products.length === 0) || products === undefined) {
        console.log("check")
        return returnData;
    }
    for(let i = 0; i < products.length; i++) {
        var obj = {
            _id: products[i].product._id,
            title: products[i].product.title,
            price: products[i].product.price,
            salePercent: products[i].product.salePercent,
            image: products[i].product.image,
            quantity: products[i].quantity,
            size: products[i].size,
        }
        if (products[i].size || products[i].size !== null) {
            for (let j = 0; j < products[i].product.sizes.length; j++) {
                if (products[i].size.toString() === products[i].product.sizes[j].size.toString()) {
                    obj.price = products[i].product.sizes[j].price;
                    break;
                }
            }   
        } 
        //obj.sizes = undefined;
        returnData.push(obj)
        obj = undefined;
    }
    return returnData;
}
*/
const queryOrder = asyncHandler(async (req, res) => {
    const {p} = req.query;
    if (!p) {
        return res.status(200).json({
            status: false,
            data: {}
        })
    }
    var phoneno = /^\d{10}$/;
    let order;
    if (p.match(phoneno)) {
        order = await Order.findOne({'mobile': p}).sort({"createdAt": -1})
            .select('-address -email -description -payment -orderBy -mobile')
            .populate('products.product', '_id title price salePercent image sizes')
            .populate('products.size', 'title _id')
            .populate('shippedBy', 'name mobile');
    } else {
        order = await Order.findOne({orderId: p})
        .select('-address -email -description -payment -orderBy -mobile')
        .populate('products.product', '_id title price salePercent image sizes')
        .populate('products.size', 'title _id')
        .populate('shippedBy', 'name mobile');

    }
    return res.status(200).json({
        status: order?true:false,
        data: order?order:{}
    })
})

const getOrder = asyncHandler(async (req, res) => {
    const { oid } = req.params
    const response = await Order.findById(oid)
        .populate('products.product', '_id title price salePercent image sizes')
        .populate('products.size', 'title _id')
        .populate('shippedBy', 'name _id mobile')
        .sort({"createdAt": -1});
    return res.json({
        status: response ? true:false,
        data: response ? response:"Something went wrong"
    })
})

const getOrders = asyncHandler(async (req, res) => {
    const {status} = req.query;
    let response;
    if (status && status === 'delivered') {
        response = await Order.find({status: status})
        .populate('products.product', '_id title price salePercent image sizes')
        .populate('products.size', 'title _id')
        .populate('shippedBy', 'name _id mobile')
        .populate('orderBy', '_id name').sort({"createdAt": -1});
    } else {
        response = await Order.find({status: {$ne: 'delivered'}})
        .populate('products.product', '_id title price salePercent image sizes')
        .populate('products.size', 'title _id')
        .populate('shippedBy', 'name _id mobile')
        .populate('orderBy', '_id name').sort({"createdAt": -1});
    }
    return res.json({
        status: response ? true:false,
        data: response ? response:[]
    })
})


const countOrders = asyncHandler(async (req, res) => {
    const {status} = req.query
    const count = await Order.countDocuments({status: status?status:'delivered'})
    return res.status(200).json({
        status: true,
        data: count,
    })
})

const updateStatus = asyncHandler(async (req, res) => {
    const { oid } = req.params
    const {status} = req.body
    if (!status) throw new Error("Missing status")
    const order =  await Order.findById(oid);
    if (order && order.status === 'delivered') {
        return res.status(200).json({
            status: false,
            data: `Cannot update order ${order.orderId} since it was delivered successfully.`
        })
    }
    order.status = status;
    await order.save();
    return res.status(200).json({
        status: true,
        data: `Updated to '${status}' status`
    })
})

const getUserOrder = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const response = await Order.find({orderBy: _id}).sort({"createdAt": -1})
    return res.json({
        status: response ? true:false,
        data: response ? response:[]
    })
})

const assignOrder = asyncHandler(async (req, res) => {
    const { oid } = req.params
    const {eid} = req.body;
    const order = await Order.findById(oid);
    if (!order) {
        return res.status(200).json({
            status: false,
            data: "Order not found."
        })
    } 
    const staff = await Employee.findById(eid);
    if (!staff) {
        return res.status(200).json({
            status: false,
            data: "Employee not found."
        })
    } 
    if (staff.role !== 'staff') {
        return res.status(200).json({
            status: false,
            data: "Employee must have role staff."
        })
    }
    order.shippedBy = staff._id;
    order.status = 'delivering';
    // for notifications
    const assignedAt = new Date();
    let time = assignedAt.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }, {day:'numeric', month: 'long', year:'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'})
    let notifyData = {
        title: order.orderId, content: `${order.orderId} - New order to you.`,  
        status: false, time: time,
        recipients: [eid]
    }
    const notify = await Notify.create(notifyData)
    notifyData._id = notify?notify._id:null
    await order.save()
    _io.emit("assign-order", notifyData)
    
    return res.status(200).json({
        status: true,
        data: `Order ID = ${order.orderId} was assigned to staff named ${staff.name}.`
    })
    
})

const updateStatusByStaff = asyncHandler(async (req, res) => {
    const { oid } = req.params
    const {status} = req.body
    const {_id} = req.user;

    if (!status) throw new Error("Missing status")
    const order = await Order.findById(oid);
    if (!order) {
        return res.json({
            status: false,
            data: "Order not found"
        })
    }
    if (order.shippedBy.toString() !== _id) {
        return res.json({
            status: false,
            data: "You are not assigned to track this order."
        })
    }
    if (order.status === 'delivered') {
        return res.status(200).json({
            status: false,
            data: `Cannot update order ${order.orderId} since it was delivered successfully.`
        })
    }
    order.status = status;
    await order.save();
    return res.status(200).json({
        status: true,
        data: `Updated to '${status}' status`
    })
})

const getActiveOrderByStaff = asyncHandler(async (req, res) => {
    const {_id} = req.user;
    const orders = await Order.find({shippedBy: _id, status: {$ne: 'delivered'}})
        .populate('products.product', '_id title price salePercent image sizes')
        .populate('products.size', 'title _id')
        .populate('shippedBy', 'name _id mobile')
        .populate('orderBy', '_id name').sort({"createdAt": -1});
    return res.status(200).json({
        status: orders?true:false,
        data: orders?orders:"Something went wrong"
    })
})
module.exports = {
    createOrder,
    updateStatus,
    getOrder,
    getOrders,
    getUserOrder,
    queryOrder,
    assignOrder,
    updateStatusByStaff,
    getActiveOrderByStaff,
    countOrders,
}