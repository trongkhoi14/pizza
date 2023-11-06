
const mongoose = require('mongoose')

var notifySchema = new mongoose.Schema({
    title: {
        type: String
    },
    content: {
        type: String,
    },
    status: {
        type: Boolean,
        default: false,
    },
    time: {
        type: String,
    },
    image: {
        type: String,
    },
    recipients: [
        {
            type: mongoose.Types.ObjectId
        }
    ]
}, {
    timestamps: true 
})

module.exports = mongoose.model('Notify', notifySchema)
