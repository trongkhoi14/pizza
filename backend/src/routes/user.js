const router = require('express').Router()
const controllers = require('../controllers/userController')
const {verifyAccessToken, isAdmin, isStaff, isManager } = require('../middlewares/verifyToken')

router.post('/register', controllers.register)
router.post('/login', controllers.login)
router.get('/current', verifyAccessToken, controllers.getCurrentUser)
router.get('/current/password', verifyAccessToken, controllers.changePassword)
router.get('/logout', controllers.logout)
//router.put('/cart', verifyAccessToken, controllers.updateCart)
//router.get('/cart', verifyAccessToken, controllers.getCart)
module.exports = router;
