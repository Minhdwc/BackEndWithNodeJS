const mongoose = require("mongoose");
//Cuộc hẹn
const appointmentSchema = mongoose.Schema({
	userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	petId: { type: mongoose.Schema.Types.ObjectId, ref: "Pet" },
	service: { type: String, required: true },
	timeStamp: { type: Date, default: Date.now },
	status: { type: String, enum: ["pending", "comfirmed", "completed"] },
});
const Appointment = mongoose.model("Appointment", appointmentSchema);
module.exports = Appointment;
