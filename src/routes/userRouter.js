const express = require('express')
const router = express.Router()
const userController = require('../Controllers/user.controller')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/create', userController.create)
router.post('/login', userController.login)
router.get('/get/d:=id', userController.getOne)
router.get('/get/all', userController.getAll)
router.get('/profile', authMiddleware.isAuthen, userController.getProfile)
router.delete('/delete', userController.deleteUser)

module.exports = router