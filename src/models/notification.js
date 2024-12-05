const mongoose = require("mongoose");
const notificationSchema = mongoose.Schema({
	userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	message: { type: String },
	isRead: { type: boolean },
	timeStamp: { type: Date, default: Date.now },
});
