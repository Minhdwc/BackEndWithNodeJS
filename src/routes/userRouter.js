const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post("/create", userController.createUser);
router.get("/getAll", userController.getAll);
router.get("/getDetails/:id", userController.getDetail);
router.post("/updateUser/:id", userController.updateUser);
module.exports = router;