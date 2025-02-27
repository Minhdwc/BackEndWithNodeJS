const express = require('express')
const router = express.Router()
const userController = require('../Controllers/user.controller')

router.post('/create', userController.create)
router.get('/get/d:=id', userController.getOne)
router.get('/get/all', userController.getAll)
router.delete('/delete', userController.deleteUser)

module.exports = router