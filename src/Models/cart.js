const mongoose = require("mongoose");
//Giỏ hàng
const cartSchema = new mongoose.Schema({
	item: [
		{
			idPet: { type: mongoose.Schema.Types.ObjectId, ref: "Pet" },
			idProduct: {type: mongoose.Schema.Types.ObjectId, ref: "Product"},
			quantity: { type: Number, required: true },
			price: { type: Number, required: true },
			totalPrice: { type: Number },
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
