const express = require("express");
const router = express.Router();
const notification = require("../../Controllers/notification.controller");

router.post("/create", notification.create);
router.get("/get", notification.getNotiByUser);
router.put("/update/u:id", notification.update);

module.exports = router;
