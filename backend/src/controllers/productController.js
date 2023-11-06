const Product = require('../models/Product')
const Category = require('../models/ProductCategory')
const Size = require('../models/Size')
const asyncHandler = require('express-async-handler');
const slugify = require('slugify')
const fs = require('fs')

const createProduct = asyncHandler(async (req, res) => {
    if (Object.keys(req.body).length === 0) throw new Error("Missing product information")

    const {title, price, category, sizes} = req.body

    if (!title || !category || !price) {
        return res.status(400).json({
            status: false,
            data: "Missing product information",
        })
    }
    // check if there is a category with provided id existed in the db
    const existedCate = await Category.findById(category);
    if (!existedCate) {
        return res.status(400).json({
            status: false,
            data: `There is no category with _id = ${category}`,
        })
    }
    req.body.slug = slugify(req.body.title)
    // check if the product has sizes or not
    if (sizes) {
        const sizesObject = JSON.parse(JSON.stringify(sizes))
        if (Array.isArray(sizesObject) && sizesObject.length !== 0) {
            for(let i = 0; i < sizesObject.length; i++) {
                if (sizesObject[i].hasOwnProperty('size') === false || sizesObject[i].hasOwnProperty('price') === false) {
                    return res.status(400).json({
                        status: false,
                        data: "Missing size or price value.",
                    })
                }
                const existedSize = await Size.findById(sizesObject[i].size);
                if (!existedSize) {
                    return res.status(400).json({
                        status: false,
                        data: `There is no size with _id = ${sizesObject[i].size}`,
                    })
                }
               
            }
        }
    } else {
        req.body.sizes = []
    }
    const newProduct = await Product.create(req.body)
    let result = undefined
    if (newProduct) {
        result = await Product.findById(newProduct._id).populate('category', '_id title').populate('sizes.size', '_id size_id title diameter description')
    }
    return res.status(200).json({
        status: newProduct ? true: false,
        data: newProduct ? result:"Cannot creat new product",
    })
}) 

const updateProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({
            status: false,
            data: "Nothing was updated.",
        })
    }
    const {title, category, sizes} = req.body
    if (title) {
        req.body.slug = slugify(req.body.title)
    } 
    // check if there is a category with provided id existed in the db
    const existedCate = await Category.findById(category);
    if (!existedCate) {
        return res.status(400).json({
            status: false,
            data: `There is no category with _id = ${category}`,
        })
    }
    // validate sizes: check if the product has sizes or not
    if (sizes) {
        const sizesObject = JSON.parse(JSON.stringify(sizes))
        console.log(JSON.stringify(sizesObject))
        if (Array.isArray(sizesObject) && sizesObject.length !== 0) {
            for(let i = 0; i < sizesObject.length; i++) {
                if (sizesObject[i].hasOwnProperty('size') === false || sizesObject[i].hasOwnProperty('price') === false) {
                    return res.status(400).json({
                        status: false,
                        data: "Missing size or price value.",
                    })
                }
                const existedSize = await Size.findById(sizesObject[i].size);
                if (!existedSize) {
                    return res.status(400).json({
                        status: false,
                        data: `There is no size with _id = ${sizesObject[i].size}`,
                    })
                }
            }
        }
    } else {
        req.body.sizes = []
    }
    const updatedProduct = await Product.findByIdAndUpdate(pid, req.body, {new: true}).populate('category', '_id title').populate('sizes.size', '_id size_id title diameter description')
    console.log("update: ", updatedProduct)
    return res.status(200).json({
        status: updatedProduct ? true: false,
        data: updatedProduct ? updatedProduct : `Cannot update product with _id=${pid}`
    })
    
    
})

const deleteProduct = asyncHandler( async (req, res) => {
    const { pid } = req.params
    const deletedProduct = await Product.findByIdAndDelete(pid)
    try {
        // remove images/ from db
        fs.unlinkSync(`${process.env.IMAGE_FOLDER}/${deletedProduct.image.substring(7)}`)
    } catch {
        console.log("Something went wrong when deleting an image")
    }
    return res.status(200).json({
        status: deletedProduct ? true: false,
        data: deletedProduct ? `Deleted product with _id=${pid}` : `Cannot delete product with id=${pid}`
    })
})


const getProduct = asyncHandler(async (req, res) => {
    const {pid} = req.params
    const product = await Product.findById(pid).populate('category', '_id title').populate('sizes.size', '_id size_id title diameter description')
    return res.status(200).json({
        status: product ? true:false,
        data: product ? product: "Cannot get product",
    })
})

const getProductsByCategory = asyncHandler(async (req, res) => {
    const categoryTitle = req.query.category;
    if (!categoryTitle) {
        return res.status(400).json({
            status: false,
            data: 'Missing category title parameter'
        });
        
    }
    const cate = await Category.findOne({ title: categoryTitle } )
    if (!cate) {
        return res.status(400).json({
            status: false,
            data: `Category '${categoryTitle}' not found`
        });
    }
    const response = await Product.find({ category: cate._id }).populate('category', '_id title').populate('sizes.size', '_id size_id title diameter description')

    return res.status(200).json({
        status: response ? true:false,
        data: response ? response: "Something went wrong or there is no data",
    })
})

const getProducts = asyncHandler(async (req, res) => {
    const queries = {...req.query}
    // exclude some special fields out of query
    const excludeFields = ['limit', 'sort', 'page', 'fields']
    excludeFields.forEach(el => delete queries[el])

    // format operators for querying in mongodb
    let queryString = JSON.stringify(queries)
    queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, matchedEl => `$${matchedEl}`)
    const formatedQueries = JSON.parse(queryString)

    // Filtering
    if (queries?.title) formatedQueries.title = {$regex: queries.title, $options: 'i'}
    let queryCommand = Product.find(formatedQueries)

    // Sorting
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ')
        queryCommand = queryCommand.sort(sortBy);
    }

    // Fields limiting
    if (req.query.fields) {
        const fields = req.query.fields.split(',').join(' ')
        queryCommand = queryCommand.select(fields)
        //console.log(queryCommand);
    }
    // Pagination
    // limit: number of documents
    // skip: ignore number of documents from beginning
    const page = +req.query.page || 1
    const limit = +req.query.limit || process.env.LIMIT_PRODUCTS
    const skip = (page - 1) * limit
    queryCommand.skip(skip).limit(limit).populate('category', '_id title').populate('sizes.size', '_id size_id title diameter description')

    
    // Execute query
    queryCommand.exec( async (err, response) => {
        if (err) throw new Error(err.mesage);
        const counts = await Product.find(formatedQueries).countDocuments();
        return res.status(200).json({
            status: response ? true:false,
            data: response ? response: "Something went wrongs",
            counts
        })
    })
    
})

const getAllProducts = asyncHandler(async (req, res) => {
    const products = await Product.find().populate('category', '_id title').populate('sizes.size', '_id title')
    return res.status(200).json({
        status: products?true:false,
        data: products?products:[]
    })
})

/*
const uploadProductImages = asyncHandler( async (req, res) => {
    const {pid} = req.params
    if (!req.files) throw new Error("Missing inputs")
    const response = await Product.findByIdAndUpdate(pid, {$push: {images: {$each: req.files.map(el => el.path)}}}, {new: true})
    return res.status(200).json({
        status: response ? true:false,
        updatedProduct: response ? response : "Cannot upload product images" 
    })
});
*/
const singleImage = asyncHandler( async (req, res) => {
    const {pid} = req.params
    //let newImgName = Math.floor(Date.now() / 10000)+"-"+req.file.originalname;
    if (!pid) {
        throw new Error('URI does not contain product ID');
    }
    if (!req.file) throw new Error("Missing image file");
    
    const response = await Product.findByIdAndUpdate(pid, {image: "api/images/" +  pid + "-" + req.file.originalname}, {new: true}).populate('category', '_id title slug')
    return res.status(200).json({
        status: response ? true:false,
        mesage: response ? "Image was added to product successfully!":"Cannot add image to product",
        data: response ? response : {}
    })
    
})

const deleteAnImage = asyncHandler( async (req, res) => {
    const { pid } = req.params
    if (!pid) {
        throw new Error('URI does not contain product ID');
    }
    const product = await Product.findById(pid).populate('category', '_id title slug')
    if (!product) {
        return res.status(200).json({
            status: false,
            message: `Product not found with _id = ${pid}`,
            data: {}
        })
    }
    try {
        fs.unlinkSync(`${process.env.IMAGE_FOLDER}/${product.image.substring(11)}`)
    } catch (e) {
        console.log("Product does not have an image.")
    }
    product.image = ""
    await product.save();
    return res.status(200).json({
        status: product ? true:false,
        message: product? "Image was deleted from product":"Cannot delete product image",
        data: product ? product : {}
    })
})

module.exports = {
    createProduct,
    getProduct,
    getProducts,
    getAllProducts,
    updateProduct,
    deleteProduct,
    getProductsByCategory,
    singleImage,
    deleteAnImage
}