const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller')
router.use(express.json())
const verify = require('../middleware/auth').verify
const user = require('../middleware/user.validation')

router.get('/', verify, controller.getUser)
router.post('/register',user.validationRegister, controller.signUp);
router.post('/login',user.validationLogin, controller.signIn);
router.patch('/topup',verify,user.validationTopup, controller.patchUser);
router.put('/',verify,user.validationUpdate, controller.updateUser);
router.delete('/:id',verify, controller.deleteUser);

module.exports = router;