const express = require('express')
const router = express.Router();
const petController = require('../Controllers/pet.controller');

router.post('/create', petController.create);

module.exports = router;