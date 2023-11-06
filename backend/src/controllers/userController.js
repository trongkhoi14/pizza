const User = require('../models/User')
const Product = require('../models/Product')
const Size = require('../models/Size')
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const { generateAccessToken, generateRefreshToken} = require('../middlewares/jwt')


const register = asyncHandler(async (req, res) => {
    /* Params: Email, Phone, Name, Password */
    const { name, email, mobile, password } = req.body
    if (!name || !email || !mobile || !password) {
        return res.status(400).json({
            status: false,
            data: "Missing registration information"
        })
    }
    // check if the user with phone are already existed
    const user = await User.findOne({mobile})
    if (user) {
        throw new Error('Phone number already exists')
    } else {
        const newUser = await User.create(req.body);
        return res.status(201).json({
            status: newUser ? true:false,
            data: "Registration was successfully, please login"
        })
    }
})

// Refresh token: Use for create a new accessToken
// Access token: use for user authentication and authorization
const login = asyncHandler( async (req, res) => {
    const {mobile, password} = req.body
    if (!mobile || !password) {
        return res.status(400).json({
            status: false,
            data: "Missing login information."
        })
    }
    const response = await User.findOne({mobile});
    if (!response) {
        return res.status(400).json({
            status: false,
            data: "Phone number not found."
        })
    }
    const passwordCorrect = await response.isCorrectPassword(password);
    //console.log(passwordCorrect);
    if (passwordCorrect) {
        const userData = response.toObject()
        // generate access token
        const accessToken = generateAccessToken(response._id, userData.role)
        // generate refresh token
        const newRefreshToken = generateRefreshToken(response._id)
        // save refresh token to the database
        await User.findByIdAndUpdate(response._id, {refreshToken: newRefreshToken}, {new: true})
        // save refresh token to cookie
        res.cookie('refreshToken', newRefreshToken, {httpOnly: true, maxAge: parseInt(process.env.REFRESH_TOKEN_DAYS) * 24 * 60 * 60 * 1000})
        return res.status(200).json({
            status: true,
            data: {
                name: userData.name,
                mobile: userData.mobile,
                email: userData.email,
                role: userData.role,
                accessToken
            }
        })
    } else {
        return res.status(400).json({
            status: false,
            data: "Incorrect password"
        })
    }
})

const getCurrentUser = asyncHandler( async (req, res) => {
    const { _id } = req.user
    const user = await User.findById(_id).select('-refreshToken -password -role -passwordChangedAt -passwordResetToken -passwordResetExpires')
    return res.status(200).json({
        status: user ? true:false,
        data: user ? user: 'User not found'
    })
})

const changePassword = asyncHandler( async (req, res) => {
    const { _id } = req.user
    if (!_id || Object.keys(req.body).length === 0) {
        return res.status(400).json({
            status: false,
            data: "Nothing was updated."
        })
    }
    const {currentPassword, newPassword } = req.body
    if (!currentPassword || !newPassword) {
        return res.status(400).json({
            status: false,
            data: "Missing inputs"
        })
    }
    // find the user
    const user = await User.findById(_id);
    const isCorrectPassword = await user.isCorrectPassword(currentPassword);
    if (!isCorrectPassword) {
        return res.status(400).json({
            status: false,
            data: "Current password did not match."
        })
    }
    //const hashedPassword = generatePassword(newPassword);
    user.password = newPassword
    await user.save();

    return res.status(200).json({
        status: true,
        data: "Password was changed successfully."
    })
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    // get token from cookies
    const cookie = req.cookies
    // check if the refresh token is existed
    if (!cookie && !cookie.refreshToken) throw new Error('No refresh token')
    const rs = await jwt.verify(cookie.refreshToken, process.env.JWT_SECRET)
    const response = await User.findOne({_id: rs._id, refreshToken: cookie.refreshToken})
    return res.status(200).json({
        status: response ? true:false,
        data: {
            newAccessToken: response ? generateAccessToken(response._id, response.role):'Refresh token not matched'
        }
    })
})

const logout = asyncHandler(async (req, res) => {
    const cookie = req.cookies
    if (!cookie || !cookie.refreshToken) throw new Error('No refresh token in cookies')
    // empty refreshToken in the database
    await User.findOneAndUpdate({refreshToken: cookie.refreshToken}, {refreshToken: ''}, {new: true})
    // delete refreshToken in the browser's cookie
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true
    })
    return res.status(200).json({
        success: true,
        message: "Logged out!"
    })
})
/*
const updateCart = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const { pid, size, quantity} = req.body
    if (!pid || quantity === undefined) {
        return res.status(400).json({
            status: false,
            data: "Missing inputs"
        })
    }
    // check existed product
    const product = await Product.findById(pid);
    if (!product) {
        return res.status(400).json({
            status: false,
            data: `Product does not exist with this _id = ${pid}`
        })
    }
    // check if the product has sizes or not
    let hasSize = true
    if ((typeof product.sizes !== 'undefined' && product.sizes.length === 0) || product.sizes === undefined) {
        hasSize = false
    }
    if (hasSize === true && !size) {
        return res.status(400).json({
            status: false,
            data: "You do not provide the size, while the product has the size."
        })
    }
    // find the user
    const user = await User.findById(_id).select('cart')
    // check the size: if no size mean we can update the cart more rapidly
    if (!size || hasSize === false) {
        const productWithNoSize = user?.cart?.find(el => el.product.toString() === pid); // an object
        if (productWithNoSize) {
            if (quantity < 1) {
                const response = await User.findByIdAndUpdate(_id, 
                    {$pull: {cart: {product: pid}}}, 
                    {new: true})
                return res.status(200).json({
                    status: response ? true:false,
                    data: response ? `The product with _id = ${pid} was removed from the cart` : 'Updating cart was failed.'
                })
            } else {
                const response = await User.findByIdAndUpdate(_id, 
                    {$set: {"cart.$[elem].quantity": quantity}},
                    {arrayFilters: [{"elem.product": pid}], new: true});
                return res.status(200).json({
                    status: response ? true:false,
                    data: response ? "The product was updated successfully" : 'Something went wrong'
                })
            }
        } else {
            const response = await User.findByIdAndUpdate(_id, 
                {$push: {cart: {product: pid, quantity}}}, 
                {new: true}).populate('cart', 'product size quantity')
            return res.status(200).json({
                status: response ? true:false,
                data: response ? "The product was added to the cart successfully" : 'Something went wrong'
            })
        }
    }
    // else mean: the product has sizes. So, check if the size is provided and is already existed
    else {
        const existedSize = await Size.findById(size);
        if (!existedSize) {
            return res.status(200).json({
                status: false,
                data: `The size with _id = ${size} does not exist`
            })
        }
    }

    const productWithSize = user?.cart?.filter(el => {
        return el.product.toString() === pid && el.size.toString() === size
    }); // an array

    if (typeof productWithSize !== 'undefined' && productWithSize.length === 1) {
        // if the quantity < 1 meaning remove the product item from the cart
        if (quantity < 1) {
            const response = await User.findByIdAndUpdate(_id, {$pull: {cart: {product: pid, size: size}}}, {new: true})
            return res.status(200).json({
                status: response ? true:false,
                data: response ? "The product was removed from the cart" : 'Updating cart was failed.'
            })
        } else {
            const response = await User.findByIdAndUpdate(_id, 
                {$set: {"cart.$[elem].quantity": quantity}},
                {arrayFilters: [{"elem.product": pid, "elem.size": size}], new: true});

            return res.status(200).json({
                status: response ? true:false,
                data: response ? "The product was updated successfully" : 'Something went wrong'
            })
        }
    }
    else {
        // meaning the product has not existed in the cart yet.
        // check if the quantity < 1 meaning wrong behavior from the client
        if (quantity < 1) {
            return res.status(200).json({
                status: false,
                data: "You prodive the wrong quantity"
            })
        }
        //size can be null if the product has no size
        const response = await User.findByIdAndUpdate(_id, 
            {$push: {cart: {product: pid, size, quantity}}}, 
            {new: true}).populate('cart', 'product size quantity')

        return res.status(200).json({
            status: response ? true:false,
            data: response ? "The product was added to the cart successfully" : 'Updating cart was failed.'
        })
    }
})

const getCart = asyncHandler( async (req, res) => {
    const { _id } = req.user
    const user = await User.findById(_id).populate('cart.product', '_id title category price sizes salePercent image').populate('cart.size', '_id title')
    // customize the result
    let returnData = []
    let cart = user?.cart;
    
    if (cart.length !== 0) {
        for(let i = 0; i < cart.length; i++) {
            var obj = {
                _id: cart[i].product._id,
                title: cart[i].product.title,
                category: cart[i].product.category,
                price: cart[i].product.price,
                salePercent: cart[i].product.salePercent,
                image: cart[i].product.image,
                quantity: cart[i].quantity,
                size: cart[i].size,
            }
            if (cart[i].size) {
                for (let j = 0; j < cart[i].product.sizes.length; j++) {
                    if (cart[i].size._id.toString() === cart[i].product.sizes[j].size.toString()) {
                        obj.price = cart[i].product.sizes[j].price;
                        break;
                    }
                }
                
            } 
            //obj.sizes = undefined;
            returnData.push(obj)
            obj = undefined;
        }
    }
    
    
    return res.status(200).json({
        status: user ? true:false,
        data: user ? returnData: 'Something went wrong'
    })
})
*/
module.exports = {
    register,
    login,
    getCurrentUser,
    changePassword,
    refreshAccessToken,
    logout,
    //updateCart,
    //getCart,
}