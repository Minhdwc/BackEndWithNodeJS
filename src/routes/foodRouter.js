const express = require('express');
const router = express.Router();
const foodController = require('../controllers/foodController');

router.post('/create', foodController.createFood);
router.get('/getAllFood', foodController.getAllFood);
router.delete('/deleteFood/:id', foodController.deleteFood);
router.post('/updateFood/:id', foodController.updateFood);

module.exports = router;