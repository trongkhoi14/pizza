const router = require('express').Router()
const { verifyAccessToken, isManagerOrAdmin, isStaff, isAdmin } = require('../middlewares/verifyToken')
const controllers = require('../controllers/orderController')

router.post('/', controllers.createOrder)
router.get('/', [verifyAccessToken, isManagerOrAdmin], controllers.getOrders)
router.get('/count', [verifyAccessToken, isManagerOrAdmin], controllers.countOrders)
router.get('/search', controllers.queryOrder)
router.get('/current', [verifyAccessToken], controllers.getUserOrder)// for a user who has ordered food.
router.get('/staff', [verifyAccessToken, isStaff], controllers.getActiveOrderByStaff)

router.get('/:oid', [verifyAccessToken, isManagerOrAdmin], controllers.getOrder)
router.put('/:oid', [verifyAccessToken, isManagerOrAdmin], controllers.updateStatus)
router.put('/staff/:oid', [verifyAccessToken, isStaff], controllers.updateStatusByStaff)
router.put('/assign/:oid', [verifyAccessToken, isManagerOrAdmin], controllers.assignOrder)



module.exports = router
