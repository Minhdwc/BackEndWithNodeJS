const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
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
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  createdAt: { type: Date, default: Date.now },
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
