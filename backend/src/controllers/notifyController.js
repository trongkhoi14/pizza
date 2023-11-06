const Notify = require('../models/Notify')
const asyncHandler = require('express-async-handler')

const createNotify = asyncHandler(async (req, res) => {
    const { title, content, time} = req.body
    if (!title || !content || !time) {
        return res.status(400).json({
            status: false,
            data: "Missing inputs"
        })
    }
    // check if the employee with phone are already existed
    const notify = await Notify.create(req.body);
    return res.status(201).json({
        status: notify  ? true:false,
        data: notify ? notify:"Something went wrong."
    })
})



const updateNotify = asyncHandler( async (req, res) => {
    const {nid} = req.params;
    const { status } = req.body
    if (!status || typeof(status) !== "boolean") {
        return res.status(200).json({
            status: false,
            data: "Wrong status. Must be true or false."
        })
    }
    const notify = await Notify.findByIdAndUpdate(nid, {status: status}, {new: true})
    return res.status(200).json({
        status: notify ? true:false,
        data: notify ? notify: 'Notify not found'
    })
})

const deleteNotify = asyncHandler( async (req, res) => {
    const {nid} = req.params;
    const notify = await Notify.findByIdAndDelete(nid)
    return res.status(200).json({
        status: notify ? true:false,
        data: notify ? notify: 'Notify not found'
    })
})

const getNotifications = asyncHandler(async (req, res) => {
    const {_id} = req.user;
    const {status} = req.query
    let notifications
    if (status) {
        notifications = await Notify.find({recipients: _id, status:status}).sort({"createdAt": -1})
    } else {
        notifications = await Notify.find({recipients: _id}).sort({"createdAt": -1})
    }

    return res.status(201).json({
        status: notifications  ? true:false,
        data: notifications ? notifications:[]
    })
})

module.exports = {
    createNotify,
    updateNotify,
    deleteNotify,
    getNotifications
}