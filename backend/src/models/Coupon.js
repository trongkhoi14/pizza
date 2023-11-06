const mongoose = require('mongoose')

var couponSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        index: true,
        lowercase: true
    },
    percent: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})

// Export the model
module.exports = mongoose.model('Coupon', couponSchema)