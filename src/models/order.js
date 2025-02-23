const mongoose = require("mongoose");
const orderSchema = mongoose.Schema({
	total: { type: Number, required: true },
	quantity: { type: Number, required: true },
	delivery_location: {
		city: { type: String },
		district: { type: String },
		street: { type: String },
		number_house: { type: String },
	},
	type_pay: { type: String, enum:["Tiền mặt", "Chuyển khoản"] },
	status: {
		type: String,
		enum: [
			"Chưa thanh toán",
			"Đang thanh toán",
			"Đã thanh toán",
			"Đang giao",
			"Đã giao",
		],
		default: "Chưa thanh toán",
	},
	item: [
		{
			itemId: { type: mongoose.Schema.Types.ObjectId, required: true },
			quantity: { type: Number, default: 1 },
			price: { type: Number, required: true },
		},
	],
	timestamp: { type: Date, default: Date.now },
});
const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
