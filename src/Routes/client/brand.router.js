const express = require('express');
const router = express.router();
const brandController = require('../../Controllers/brand.controller')

router.post('/create', brandController.create)
router.get('/get/d=:id', brandController.getOne)
router.get('/get/all', brandController.getAll)
router.post('update/u=:id', brandController.update)
router.delete('/delete/d=:id', brandController.deleteBrand)