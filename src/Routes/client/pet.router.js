const express = require('express')
const router = express.Router();
const petController = require('../../Controllers/pet.controller');

router.post('/create', petController.create);
router.get('/get/d=:id', petController.getOne);
router.get('/get/all', petController.getAll);
router.post('/update/u=:id', petController.update);
router.delete('/delete/d=:id', petController.deletePet)

module.exports = router;