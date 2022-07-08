const express = require('express');
const router = express.Router();
const controller = require('../controllers/product.controller')
const verify = require('../middleware/auth').verify
const product = require('../middleware/product.validation')
router.use(express.json())


router.get('/',verify, controller.getProduct)
router.post('/',verify,product.validation,controller.postProduct)
router.put('/:productId', verify,controller.updateProduct)
router.delete('/:productId', verify,controller.deleteProduct)


module.exports = router;