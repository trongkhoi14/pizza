const Employee = require('../models/Employee')
const Product = require('../models/Product')
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const { generateAccessToken, generateRefreshToken} = require('../middlewares/jwt')


const createStaff = asyncHandler(async (req, res) => {
    /* Params: Phone, Name, Password */
    const { name, mobile, password} = req.body
    if (!name || !mobile || !password) {
        return res.status(400).json({
            status: false,
            data: "Missing registration information"
        })
    }
    // check if the employee with phone are already existed
    const employee = await Employee.findOne({mobile})
    if (employee) {
        throw new Error('Phone number already exists')
    } else {
        req.body.role = 'staff'
        // To across this function, it must across the verifyToken function, which has set the value of req.user as the role of the user
        req.body.createdBy = req.user
        const newEmployee = await Employee.create(req.body);
        return res.status(201).json({
            status: newEmployee ? true:false,
            data: "Staff created."
        })
    }
})

const createManager = asyncHandler(async (req, res) => {
    /* Params: Phone, Name, Password */
    const { name, mobile, password} = req.body
    if (!name || !mobile || !password) {
        return res.status(400).json({
            status: false,
            data: "Missing registration information"
        })
    }
    // check if the employee with phone are already existed
    const employee = await Employee.findOne({mobile})
    if (employee) {
        throw new Error('Phone number already exists')
    } else {
        req.body.role = 'manager'
        // To across this function, it must across the verifyToken function, which has set the value of req.user as the role of the user
        req.body.createdBy = req.user
        const newEmployee = await Employee.create(req.body);
        return res.status(201).json({
            status: newEmployee ? true:false,
            data: "Manager created."
        })
    }
})


// Refresh token: Use for create a new accessToken
// Access token: use for employee authentication and authorization
const login = asyncHandler( async (req, res) => {
    const {mobile, password} = req.body
    if (!mobile || !password) {
        return res.status(400).json({
            status: false,
            data: "Missing login information"
        })
    }
    const response = await Employee.findOne({mobile});
    if (!response) {
        return res.status(400).json({
            status: false,
            data: "Phone number does not exist"
        })
    }
    const passwordCorrect = await response.isCorrectPassword(password);
    //console.log(passwordCorrect);
    if (passwordCorrect) {
        const employeeData = response.toObject()
        // generate access token
        const accessToken = generateAccessToken(response._id, employeeData.role)
        // generate refresh token
        const newRefreshToken = generateRefreshToken(response._id)
        // save refresh token to the database
        await Employee.findByIdAndUpdate(response._id, {refreshToken: newRefreshToken}, {new: true})
        // save refresh token to cookie
        res.cookie('refreshToken', newRefreshToken, {httpOnly: true, maxAge: parseInt(process.env.REFRESH_TOKEN_DAYS) * 24 * 60 * 60 * 1000})
        return res.status(200).json({
            status: true,
            data: {
                _id: employeeData._id,
                name: employeeData.name,
                mobile: employeeData.mobile,
                email: employeeData.email,
                role: employeeData.role,
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

const updateInfo = asyncHandler( async (req, res) => {
    const { _id, role } = req.user
    if (!_id || Object.keys(req.body).length === 0) {
        return res.status(400).json({
            status: false,
            data: "Nothing was updated."
        })
    }
    // blocking unwanted fields from the client
    req.body.role = undefined
    req.body.password = undefined
    req.body.isBlocked = undefined
    if (role !== 'admin' && role !== 'manager') {
        req.body.store = undefined
    }
    if (req.body.mobile === '' || req.body.mobile === null) {
        req.body.mobile = undefined
    }
    const employee = await Employee.findByIdAndUpdate(_id, req.body, {new: true}).select('-refreshToken -password -role -passwordChangedAt -passwordResetToken -passwordResetExpires -createdAt -updatedAt').populate('createdBy', '_id name')
    return res.status(200).json({
        status: employee ? true:false,
        data: employee ? employee: 'Employee not found'
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
    const employee = await Employee.findById(_id);
    const isCorrectPassword = await employee.isCorrectPassword(currentPassword);
    if (!isCorrectPassword) {
        return res.status(400).json({
            status: false,
            data: "Current password did not match."
        })
    }
    //const hashedPassword = generatePassword(newPassword);
    employee.password = newPassword
    await employee.save();

    return res.status(200).json({
        status: true,
        data: "Password was changed successfully."
    })
})

const changeInfoById = asyncHandler( async (req, res) => {
    /* this function allows admin or manager can change staff info */
    const {eid} = req.params 
    
    if (!eid || Object.keys(req.body).length === 0) {
        return res.status(400).json({
            status: false,
            data: "Nothing was updated."
        })
    }
    // blocking update role and password
    req.body.role = undefined
    req.body.password = undefined
    if (req.body.mobile === '' || req.body.mobile === null) {
        req.body.mobile = undefined
    }
    const employee = await Employee.findByIdAndUpdate(eid, req.body, {new: true}).select('-refreshToken -password -role -passwordChangedAt -passwordResetToken -passwordResetExpires -createdAt -updatedAt').populate('createdBy', '_id name')
    return res.status(200).json({
        status: employee ? true:false,
        data: employee ? employee: 'Employee not found'
    })
})

const getCurrentEmployee = asyncHandler( async (req, res) => {
    const { _id } = req.user
    const employee = await Employee.findById(_id).select('-refreshToken -password -role -passwordChangedAt -passwordResetToken -passwordResetExpires -createdAt -updatedAt').populate('createdBy', '_id name')
    return res.status(200).json({
        status: employee ? true:false,
        data: employee ? employee: 'Employee not found'
    })
})

const getStaffs = asyncHandler( async (req, res) => {
    const staffs = await Employee.find({role: 'staff'}).select('-refreshToken -password -role -passwordChangedAt -passwordResetToken -passwordResetExpires -createdAt -updatedAt').populate('createdBy', '_id name')
    return res.status(200).json({
        status: staffs ? true:false,
        data: staffs ? staffs: 'Something went wrong.'
    })
})

const getManagers = asyncHandler( async (req, res) => {
    const managers = await Employee.find({role: 'manager'}).select('-refreshToken -password -role -passwordChangedAt -passwordResetToken -passwordResetExpires -createdAt -updatedAt').populate('createdBy', '_id name')
    return res.status(200).json({
        status: managers ? true:false,
        data: managers ? managers: 'Something went wrong.'
    })
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    // get token from cookies
    const cookie = req.cookies
    // check if the refresh token is existed
    if (!cookie && !cookie.refreshToken) throw new Error('No refresh token')
    const rs = await jwt.verify(cookie.refreshToken, process.env.JWT_SECRET)
    const response = await Employee.findOne({_id: rs._id, refreshToken: cookie.refreshToken})
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
    await Employee.findOneAndUpdate({refreshToken: cookie.refreshToken}, {refreshToken: ''}, {new: true})
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


module.exports = {
    createStaff,
    createManager,
    login,
    getStaffs,
    getManagers,
    getCurrentEmployee,
    refreshAccessToken,
    logout,
    updateInfo,
    changeInfoById,
    changePassword
}