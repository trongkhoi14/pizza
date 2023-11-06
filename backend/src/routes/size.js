const router = require('express').Router()
const controllers = require('../controllers/sizeController')
const {verifyAccessToken, isManagerOrAdmin} = require('../middlewares/verifyToken')

router.post('/', [verifyAccessToken, isManagerOrAdmin], controllers.createSize)
router.get('/', controllers.getSizes)
router.get('/:sid', controllers.getSize)
router.put('/:sid', [verifyAccessToken, isManagerOrAdmin], controllers.updateSize)
//router.delete('/:sid', [verifyAccessToken, isManagerOrAdmin], controllers.deleteSize)

module.exports = router