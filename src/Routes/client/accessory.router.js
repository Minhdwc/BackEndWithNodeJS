const express = require('express');
const router = express.Router();
const accessoryController = require('../../Controllers/accessory.controller')

router.post('/create', accessoryController.create)
router.get('/get/d=:id', accessoryController.getOne)
router.get('/get/all', accessoryController.getAll)
router.post('update/u=:id', accessoryController.update)
router.delete('/delete/d=:id', accessoryController.deleteAccesory)

module.exports = router