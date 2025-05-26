const express = require("express");
const router = express.Router();
const orderController = require("../../Controllers/order.controller");
const { isAuthen } = require("../../middleware/authMiddleware");

router.post("/from-cart", isAuthen, orderController.createFromCart);

router.post(
  "/:orderId/confirm-payment",
  isAuthen,
  orderController.confirmPayment
);

router.get("/getAll/", isAuthen, orderController.getAll);

router.get("/getOne/o=:id", isAuthen, orderController.getOne);

router.put("/update/o=:id", isAuthen, orderController.update);

router.delete("/delete/o=:id", isAuthen, orderController.deleteOrder);

module.exports = router;
