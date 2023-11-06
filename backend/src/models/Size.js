const mongoose = require('mongoose')

var sizeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: [true, "Size title must be an unique value"],
        index: true,
        enum: ['m', 'l', 'xl']
    },
    size_id: {
        type: Number, 
        unique: [true, "Size id must be an unique value"],
        enum: [1, 2, 3]
    },
    diameter: {
        type: String,
    },
    description: {
        type: String
    }
}, {
    timestamps: true
})
/*
sizeSchema.pre('save', async function(next) {
    if (!this.isModified('title')) {
        next()
    }
    if (this.title === 'm') {
        this.size_id = 1;
    }
    if (this.title === 'l') {
        this.size_id = 2
    } 
    if (this.title === 'xl') {
        this.size_id = 3
    }
})
*/

// Export the model
module.exports = mongoose.model('Size', sizeSchema)