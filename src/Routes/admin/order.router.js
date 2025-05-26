const express = require("express");
const router = express.Router();
const orderController = require("../../Controllers/order.controller");
const { isAuthen, authorization } = require("../../middleware/authMiddleware");

router.get("/getAll/", isAuthen, authorization, orderController.getAll);

router.get("/getOne/o=:id", isAuthen, authorization, orderController.getOne);

router.put("/update/o=:id", isAuthen, authorization, orderController.update);

router.delete("/delete/o=:id", isAuthen, authorization, orderController.deleteOrder);

module.exports = router;
