const express = require('express')
const router = express.Router();
const product = require('../../Controllers/product.controller');

router.post('/create', product.create);
router.get('/get/d=:id', product.getOne);
router.get('/get/all', product.getAll);
router.post('/update/u=:id', product.update);
router.delete('/delete/d=:id', product.deletePro)

module.exports = router;