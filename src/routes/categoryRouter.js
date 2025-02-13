const express = require('express');
const router = express.Router();
const categoryController = require('../Controllers/categoryController');

router.post('/create', categoryController.create)
router.get('/get/d=:id', categoryController.getOne)
router.get('/get/all', categoryController.getAll)
router.post('/update/u=:id', categoryController.update)
router.delete('/delete/d=:id', categoryController.deleteCate)

module.exports = router;