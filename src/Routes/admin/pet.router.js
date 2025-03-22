const express = require('express')
const multer = require("multer")
const router = express.Router();
const petController = require('../../Controllers/pet.controller');

const upload = multer({storage: multer.memoryStorage()})

router.post('/create', upload.single("image"), petController.create);
router.get('/get/d=:id', petController.getOne);
router.get('/get/all', petController.getAll);
router.post('/update/u=:id', petController.update);
router.delete('/delete/d=:id', petController.deletePet)

module.exports = router;