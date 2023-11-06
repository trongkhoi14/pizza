const mongoose = require('mongoose')

var productCategorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        index: true,
        lowercase: true
    },
    description: {
        type: String
    }
}, {
    timestamps: true
})

// Export the model
module.exports = mongoose.model('ProductCategory', productCategorySchema)