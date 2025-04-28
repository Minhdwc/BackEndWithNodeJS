const mongoose = require("mongoose");
const reviewSchema = mongoose.Schema({
	userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
	itemId: { type: mongoose.Schema.Types.ObjectId },
	comment: { type: String, required: true },
	timeStamp: { type: Date, default: Date.now },
});
const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
