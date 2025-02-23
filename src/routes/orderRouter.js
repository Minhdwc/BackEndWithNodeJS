const express = require('express');
const router = express.Router();
const orderController = require('../Controllers/order.controller')
const authen = require('../middleware/authMiddleware')

router.post('/create', authen.isAuthen, orderController.create)
router.get('/get', authen.isAuthen, orderController.getOne)
router.get('/get/all', authen.isAuthen, orderController.getAll)
router.put('/update/u:id', authen.isAuthen, orderController.update)
router.delete('/delete/d:id', authen.isAuthen, orderController.deleteOrder)

module.exports = router