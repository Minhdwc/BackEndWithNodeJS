const express = require('express');
const router = express.Router();
const orderController = require('../../Controllers/order.controller')

router.post('/create', orderController.create)
router.get('/get', orderController.getOne)
router.get('/get/all', orderController.getAll)
router.put('/update/u:id', orderController.update)
router.delete('/delete/d:id', orderController.deleteOrder)

module.exports = router