const mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    // major fields
    title: {
        type: String,
        required: [true, "Please provide a product name."],
        unique: true,
        trim: true,
        lowercase: true
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'ProductCategory',
        required: [true, "Please provide a category _id."],
    },
    description: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        required: [true, "Please provide a base price"]
    },
    sizes: {
        type: [
            {
                // 1: M, 2: L, 3:XL
                _id: false,
                size: {
                    type: mongoose.Types.ObjectId,
                    ref: 'Size',
                    required: [true, "Please provide a size _id."],
                },
                price: {type: Number, min: 0, max: 10000000}
            }
        ]
    },
    image: {
        type: String
    },

    // minor fields
    sold: {
        type: Number,
        default: 0,
    },
    
    slug: {
        type:String,
        lowercase: true,
    },
    hidden: {
        type: Boolean,
        default: false
    },
    salePercent: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Product', productSchema)