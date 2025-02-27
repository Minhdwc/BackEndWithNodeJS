const express = require('express')
const router = express.Router();
const notification = require('../Controllers/notification.controller')
const authen = require('../middleware/authMiddleware')

router.post('/create', authen.isAuthen ,notification.create)
router.get('/get', authen.isAuthen, notification.getNotiByUser)
router.put('/update/u:id', authen.isAuthen, notification.update)

module.exports = router;