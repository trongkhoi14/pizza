const Store = require('../models/Store')
const asyncHandler = require('express-async-handler')

const createStore= asyncHandler( async (req, res) => {
    const {name, address, isMainStore} = req.body
    if (!name || !address) {
        return res.status(400).json({   
            status: false,
            data: "Missing inputs"
        })
    }
    // validate title to generate constant size_id value
    
    const response = await Store.create({name, address, isMainStore: isMainStore?true:false});
    return res.status(200).json({
        status: response ? true:false,
        data: response ? response: "Cannot create new store",
    })
})

const getStores = asyncHandler( async (req, res) => {
    const response = await Store.find().select('_id name address isMainStore')
    return res.status(200).json({
        status: response ? true:false,
        data: response ? response: [],
    })
})


const getStore = asyncHandler( async (req, res) => {
    const {sid} = req.params 
    const response = await Store.findById(sid).select('_id name address isMainStore')
    return res.status(200).json({
        status: response ? true:false,
        data: response ? response: {},
    })
})

module.exports = {
    createStore,
    getStores,
    getStore,
}