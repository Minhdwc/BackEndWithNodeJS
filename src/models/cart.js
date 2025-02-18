const mongoose = require("mongoose");
//Giỏ hàng
const cartSchema = new mongoose.Schema({
	item: [
		{
			idItem: { type: mongoose.Schema.Types.ObjectId },
			quantity: { type: Number, required: true },
			price: { type: Number, required: true },
			totalPrice: { type: Number },
			image: { type: String },
			category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
		},
	],
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "User",
	},
	timeStamp: { type: Date, default: Date.now },
});
const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
