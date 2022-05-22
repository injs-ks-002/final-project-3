const express = require('express');
const router = express.Router();
const controller = require('../controllers/product.controller')
const verify = require('../middleware/auth').verify
router.use(express.json())

router.get('/', verify,controller.getProduct)
router.post('/', verify,controller.postProduct)
router.put('/:productId', verify,controller.updateProduct)
router.delete('/:productId', verify,controller.deleteProduct)


module.exports = router;