const express = require('express')
const router = express.Router()
const authController = require('../Controllers/auth.controller')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/login', authController.login)
router.get('/profile', authMiddleware.isAuthen, authController.getProfile)

module.exports = router