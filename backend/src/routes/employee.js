const router = require('express').Router()
const controllers = require('../controllers/employeeController')
const {verifyAccessToken, isAdmin, isStaff, isManager, isManagerOrAdmin } = require('../middlewares/verifyToken')
//const bcrypt = require('bcrypt');

router.post('/staff', [verifyAccessToken, isManagerOrAdmin], controllers.createStaff)
router.get('/staff', [verifyAccessToken, isManagerOrAdmin], controllers.getStaffs)
router.post('/manager', [verifyAccessToken, isAdmin], controllers.createManager)
router.get('/manager', [verifyAccessToken, isAdmin], controllers.getManagers)

router.post('/login', controllers.login)
router.get('/current', verifyAccessToken, controllers.getCurrentEmployee)
router.put('/current', verifyAccessToken, controllers.updateInfo)
router.put('/current/password', verifyAccessToken, controllers.changePassword)
router.put('/:eid', [verifyAccessToken, isManagerOrAdmin], controllers.changeInfoById)

router.get('/logout', controllers.logout)
/*
router.get('/generate', async(req, res) => {

    const {text} = req.body
    const salt = bcrypt.genSaltSync(10)
    const rs = await bcrypt.hash(text, salt)
    return res.json({
        data: rs
    })
})
*/
module.exports = router;
