const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const controller = require('../controllers/transaction.controller')
const transaction = require('../middleware/transaction.validation')

router.post('/', auth.verify, transaction.validation, controller.postTransaction)
router.get('/user', auth.verify, controller.getTransactionForUser)
router.get('/admin', auth.verify, controller.getTransactionForAdmin)
router.get('/:transactionId', auth.verify, controller.getTransactionById)

module.exports = router