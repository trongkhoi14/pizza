const ProductCategory = require('../models/ProductCategory')
const Product = require('../models/Product')
const asyncHandler = require('express-async-handler')

const createCategory = asyncHandler( async (req, res) => {
    const {title} = req.body
    if (!title) {
        return res.status(400).json({
            status: false,
            data: "Missing category's title"
        })
    }
    const response = await ProductCategory.create({title});
    return res.status(200).json({
        status: response ? true:false,
        data: response ? response: 'Cannot create new product category',
    })
})

const updateCategory = asyncHandler( async (req, res) => {
    const {title} = req.body
    if (!title) {
        return res.status(400).json({
            status: false,
            data: "Missing category's title"
        })
    }
    const {pcid} = req.params 
    const response = await ProductCategory.findByIdAndUpdate(pcid, {title}, {new: true});
    return res.status(200).json({
        status: response ? true:false,
        data: response ? response: `Cannot update product category with _id = ${pcid}`,
    })
})

const deleteCategory = asyncHandler( async (req, res) => {
    const {pcid} = req.params 
    const product = await Product.findOne({"category": pcid });
    if (product) {
        return res.status(400).json({
            status: false,
            data: "There is a product which belong to this category. Please remove the relevant product first."
        })
    }
    const response = await ProductCategory.findByIdAndDelete(pcid);
    return res.status(200).json({
        status: response ? true:false,
        data: response ? response: `Cannot delete product category with _id = ${pcid}`,
    })
})

const getCategories = asyncHandler( async (req, res) => {
    const response = await ProductCategory.find().select('title _id')
    return res.status(200).json({
        status: response ? true:false,
        data: response ? response: 'Something went wrong',
    })
})


const getCategory = asyncHandler( async (req, res) => {
    const {pcid} = req.params 
    const response = await ProductCategory.findById(pcid)
    return res.status(200).json({
        status: response ? true:false,
        data: response ? response: 'Something went wrong!',
    })
})

module.exports = {
    createCategory,
    updateCategory,
    deleteCategory,
    getCategories,
    getCategory,
}