const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');

router.post("/create", petController.createPet);
router.get("/getAllPet", petController.getAllPet);
router.post("/updatePet/:id", petController.updatePet);
router.delete("/deletePet/:id", petController.deletePet);
module.exports = router;