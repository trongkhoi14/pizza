const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const crypto = require('crypto')

var employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 60
    },
    email: {
        type: String,
        //unique: true,
        maxLength: 60,
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
        maxLength: 15,
    },
    birthday: {
        type: Date,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'staff',
        enum: ['staff', 'manager', 'admin']
    },
    store: [
        {type: mongoose.Types.ObjectId, ref: 'Store'}
    ],
    createdBy: {
        type: mongoose.Types.ObjectId, ref: 'Employee'
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
    startDate: {
        type: Date,
        default: Date.now()
    },
    endDate: {
        type: Date
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

employeeSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next()
    }
    const salt = bcrypt.genSaltSync(10)
    this.password = await bcrypt.hash(this.password, salt)

})

employeeSchema.methods = {
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

module.exports = mongoose.model('Employee', employeeSchema);


