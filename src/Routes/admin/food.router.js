const express = require('express');
const router = express.Router();
const foodController = require('../../Controllers/food.controller')

router.post('/create', foodController.create)
router.get('/get/d=:id', foodController.getOne)
router.get('/get/all', foodController.getAll)
router.post('update/u=:id', foodController.update)
router.delete('/delete/d=:id', foodController.deleteFood)

module.exports = router