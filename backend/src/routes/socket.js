const router = require('express').Router()
const controllers = require('../controllers/orderController')

router.get('/', async(req, res, next) => {
    const {msg} = req.query;
    _io.emit('new-order', msg);
    return res.json({code: 200, msg})
})
module.exports = router;