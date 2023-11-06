const mongoose = require('mongoose')

var sizeSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    address: {
        type: String,
    },
    isMainStore: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true
})

// Export the model
module.exports = mongoose.model('Size', sizeSchema)