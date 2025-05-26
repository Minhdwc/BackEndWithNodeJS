const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  item: [
    {
      itemType: {
        type: String,
        required: true,
        enum: ["Pet", "Food", "Accessory"],
      },
      itemId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: "item.itemType",
      },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  quantity: { type: Number, required: true },
  total: { type: Number, required: true },

  delivery_location: {
    display_name: { type: String },
    lat: { type: Number, required: true },
    lon: { type: Number, required: true },
    address: { type: Object },
  },
  delivery_note: { type: String },

  paymentMethod: {
    type: String,
    enum: ["Tiền mặt", "Chuyển khoản"],
    default: "Tiền mặt",
  },
  paymentStatus: {
    type: String,
    enum: ["Chưa thanh toán", "Đang thanh toán", "Đã thanh toán"],
    default: "Chưa thanh toán",
  },
  shippingStatus: {
    type: String,
    enum: ["Chưa giao", "Đang giao", "Đã giao"],
    default: "Chưa giao",
  },

  isCancelled: { type: Boolean, default: false },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
