const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');

router.post("/create", petController.createPet);
router.get("/getAllPet", petController.getAllPet);
module.exports = router;