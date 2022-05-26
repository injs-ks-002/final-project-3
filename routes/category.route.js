const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const controller = require('../controllers/category.controller')
const category = require('../middleware/category.validation')

router.post('/', auth.verify, category.validation, controller.postCategory)
router.get('/', auth.verify, controller.getCategory)
router.patch('/:categoryId', auth.verify, category.validationForPatch, controller.patchCategory)
router.delete('/:categoryId', auth.verify, controller.deleteCategory)

module.exports = router