const express = require('express');
const router = express.Router();
const cartController = require('../../Controllers/cart.controller')

router.post('/create',  cartController.create)
router.put('/update',  cartController.update)
router.delete('/delete/d:id',  cartController.deleteCart)

module.exports = router;