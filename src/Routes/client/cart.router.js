const express = require('express');
const router = express.Router();
const cartController = require('../../Controllers/cart.controller')
const authMiddleware = require('../../middleware/authMiddleware')

router.post('/create', authMiddleware.isAuthen, cartController.create)
router.get('/get/c=:id', authMiddleware.isAuthen, cartController.getCartOfUser)
router.post('/update/u=:id', authMiddleware.isAuthen, cartController.update)
router.delete('/delete', authMiddleware.isAuthen, cartController.deleteCart)

module.exports = router;