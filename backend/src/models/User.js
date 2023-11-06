const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const crypto = require('crypto')

var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 60
    },
    email: {
        type: String,
        required: true,
        maxLength: 60,
        unique: true,
    },
    mobile: {
        type: String,
        required: true,
        index: true,
        unique: true,
        maxLength: 15,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'user'
    },
    birthday: {
        type: Date,
    },
    address: {
        type: String,
    },
    /*
    cart: [{
        _id: false,
        product: {type: mongoose.Types.ObjectId, ref: 'Product'},
        size: {type: mongoose.Types.ObjectId, ref: 'Size'},
        quantity: { type: Number, min: 1, max: 100}
    }],
    */
    isBlocked: {
        type: Boolean,
        default: false,
    },
    
    refreshToken: {
        type: String,
    },
    passwordChangedAt: {
        type: String,
    },
    passwordResetToken: {
        type: String,
    },
    passwordResetExpires: {
        type: String,
    }
}, { timestamps: true 
})

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next()
    }
    const salt = bcrypt.genSaltSync(10)
    this.password = await bcrypt.hash(this.password, salt)

})

userSchema.methods = {
    isCorrectPassword: async function (password) {
        return await bcrypt.compare(password, this.password)
    },
    createPasswordChangedToken: function() {
        const resetToken = crypto.randomBytes(32).toString('hex')
        this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')
        this.passwordResetExpires = Date.now() + 15 * 60 * 1000
        return resetToken
    }
}

module.exports = mongoose.model('User', userSchema);


