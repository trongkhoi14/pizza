
const mongoose = require('mongoose')

var orderSchema = new mongoose.Schema({
    products: [{
        _id: false,
        product: {type: mongoose.Types.ObjectId, ref: 'Product'},
        size: {type: mongoose.Types.ObjectId, ref: 'Size'},
        quantity: { type: Number, min: 1, max: 100}
    }],
    orderId: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: 'pending',
        enum: ['cancelled', 'pending', 'preparing', 'delivering', 'delivered']
    },
    orderBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    totalProduct: Number,
    totalPrice: Number,
    shippingFee: {
        type: Number,
        default: 0,
    },
    coupon: {
        type: mongoose.Types.ObjectId,
        ref: 'Coupon'
    },

    name: String,
    mobile: String,
    email: String,
    address: String,
    description: String,
    method: {
        name: {
            type: String,
            default: "homedelivery",
            enum: ["homedelivery",  "takeaway"]
        },
        hour: String,
    },
    payment: Object,
    shippedBy: {
        type: mongoose.Types.ObjectId,
        ref: 'Employee'
    },
}, {
    timestamps: true 
})

module.exports = mongoose.model('Order', orderSchema)
