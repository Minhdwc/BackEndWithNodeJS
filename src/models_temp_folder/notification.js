
const mongoose = require("mongoose");
const notificationSchema = mongoose.Schema({
	userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	message: { type: String },
	isRead: { type: Boolean },
	timeStamp: { type: Date, default: Date.now },
});
const notification = mongoose.model("notification", notificationSchema);
module.exports = notification;