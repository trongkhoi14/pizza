/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - title
 *         - category
 *         - price
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the product
 *         title:
 *           type: string
 *           description: The title of your product
 *         price:
 *           type: integer
 *           description: The base price of a product
 *         category:
 *           type: string
 *           description: A string that indicate an object id of a category
 *         description:
 *           type: string
 *           description: The short description of the product
 *         hidden: 
 *           type: boolean
 *           default: false
 *           description: whether the product is visible to the client
 *         image: 
 *           type: string
 *           description: "Product's image, using singImageApi to upload"
 *         slug:
 *           type: string
 *           description: "It will be auto-generated from the title"
 *       example:
 *         #case 1: hasOption = false, we don't need the field options, and ortherwise
 *         id: 642502c4eb04b25a2a57db86
 *         title: Pizza Seafood
 *         category: 641e7d72c95813895d336999
 *         price: 150000
 *         description: ""
 * 
 *         
 */

const router = require('express').Router()
const controllers = require('../controllers/productController')
const {verifyAccessToken, isAdmin} = require('../middlewares/verifyToken')
//const uploader = require("../config/cloudinary.config")
const singleUploader = require('../config/uploader');

router.post('/', [verifyAccessToken, isAdmin],  controllers.createProduct)
router.get('/', controllers.getProducts)
router.get('/all', controllers.getAllProducts)
router.get('/category', controllers.getProductsByCategory)

//router.put('/upload/:pid', [verifyAccessToken, isAdmin], uploader.array('images', 3), controllers.uploadProductImages)
router.put('/image/:pid', [verifyAccessToken, isAdmin], singleUploader.single('image'), controllers.singleImage)
router.delete('/image/:pid', [verifyAccessToken, isAdmin], controllers.deleteAnImage)
router.get('/:pid', controllers.getProduct),
router.put('/:pid', [verifyAccessToken, isAdmin], controllers.updateProduct)
router.delete('/:pid', [verifyAccessToken, isAdmin], controllers.deleteProduct)


module.exports = router