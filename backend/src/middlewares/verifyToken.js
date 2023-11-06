const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

const verifyAccessToken = asyncHandler(async (req, res, next) => {
    // Bearer token
    // headers: {authorization: Bearer token}
    if (req?.headers?.authorization?.startsWith('Bearer')) {
        const token = req.headers.authorization.split(' ')[1]
        jwt.verify(token, process.env.JWT_SECRET, (error, decode) => {
            if (error) return res.status(401).json({
                status: false,
                data: 'Identification failed'
            })
            req.user = decode
            next()
        })
    } else {
        return res.status(401).json({
            status: false,
            data: 'Authetication failed'
        })
    }
}) 

const isAdmin = asyncHandler( async (req, res, next) => {
    const { role } = req.user
    if (role !== 'admin') {
        return res.status(403).json({
            status: false,
            data: 'Require role Admin'
        })
    }
    next();
})

const isStaff = asyncHandler( async (req, res, next) => {
    const { role } = req.user
    if (role !== 'staff') {
        return res.status(403).json({
            status: false,
            data: 'Require role Staff'
        })
    }
    next();
})

const isManager = asyncHandler( async (req, res, next) => {
    const { role } = req.user
    if (role !== 'manager') {
        return res.status(403).json({
            status: false,
            data: 'Require role Manager'
        })
    }
    next();
})

const isManagerOrAdmin = asyncHandler( async (req, res, next) => {
    const { role } = req.user
    if (role !== 'manager' && role !== 'admin') {
        return res.status(403).json({
            status: false,
            data: 'Require role Manager or Admin'
        })
    }
    next();
})

const isEmployee = asyncHandler( async (req, res, next) => {
    const { role } = req.user
    if (role !== 'manager' && role !== 'admin' && role !== 'staff') {
        return res.status(403).json({
            status: false,
            data: 'Require role Manager or Admin or Staff'
        })
    }
    next();
})

module.exports = {
    verifyAccessToken,
    isAdmin,
    isStaff,
    isManager,
    isManagerOrAdmin,
    isEmployee,
}