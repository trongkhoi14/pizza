const router = require('express').Router()
const controllers = require('../controllers/notifyController')
const {verifyAccessToken, isEmployee} = require('../middlewares/verifyToken')

router.get('/',[verifyAccessToken, isEmployee], controllers.getNotifications)
router.post('/', [verifyAccessToken, isEmployee], controllers.createNotify)
router.put('/:nid', [verifyAccessToken, isEmployee], controllers.updateNotify)
router.delete('/:nid', [verifyAccessToken, isEmployee], controllers.deleteNotify)

module.exports = router