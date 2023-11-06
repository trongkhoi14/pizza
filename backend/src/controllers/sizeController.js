const Size = require('../models/Size')
const Product = require('../models/Product')
const asyncHandler = require('express-async-handler')

const createSize = asyncHandler( async (req, res) => {
    const {title} = req.body
    if (!title) {
        return res.status(400).json({   
            status: false,
            data: "Missing size input"
        })
    }
    // validate title to generate constant size_id value
    let temp = {"m": 1, "l": 2, "xl": 3}
    if (title !== "m" && title !== "l" && title !== "xl") {
        return res.status(400).json({
            status: false,
            data: "Size name must be m, l or xl"
        })
    }
    req.body.size_id = temp[title]
    const response = await Size.create(req.body);
    return res.status(200).json({
        status: response ? true:false,
        data: response ? response: "Cannot create a new size",
    })
})

const updateSize = asyncHandler( async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({
            status: false,
            data: "Nothing was updated.",
        })
    }
    const {title} = req.body
    if (title) {
        // validate title to generate constant size_id value
        let temp = {"m": 1, "l": 2, "xl": 3}
        if (title !== "m" && title !== "l" && title !== "xl") {
            return res.status(400).json({
                status: false,
                data: "Size name must be m, l or xl"
            })
        }
        req.body.size_id = temp[title]
    }
    
    const {sid} = req.params 
    const response = await Size.findByIdAndUpdate(sid, req.body, {new: true});
    return res.status(200).json({
        status: response ? true:false,
        data: response ? response: `Cannot update size record with _id = ${sid}`,
    })
})

const deleteSize = asyncHandler( async (req, res) => {
    const {sid} = req.params 
    
    // let's find if there is a product has this size id
    const product = await Product.findOne({"sizes": {$elemMatch: {size: sid}}})
    if (product) {
        return res.status(400).json({
            status: false,
            data: "There is a product which has this size. Please remove the relevant size in that product or remove that product first."
        })
    }
    const response = await Size.findByIdAndDelete(sid);
    return res.status(200).json({
        status: response ? true:false,
        data: response ? response: `Cannot delete size record with _id = ${sid}`,
    })
})

const getSizes = asyncHandler( async (req, res) => {
    const response = await Size.find().select('_id title description diameter size_id')
    return res.status(200).json({
        status: response ? true:false,
        data: response ? response: "Something went wrong.",
    })
})


const getSize = asyncHandler( async (req, res) => {
    const {sid} = req.params 
    const response = await Size.findById(sid).select('_id title description diameter size_id')
    return res.status(200).json({
        status: response ? true:false,
        data: response ? response: "Something went wrong.",
    })
})

module.exports = {
    createSize,
    updateSize,
    deleteSize,
    getSizes,
    getSize,
}