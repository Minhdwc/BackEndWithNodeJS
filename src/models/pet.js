const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PetSchema = new Schema({
	name: { type: String, required: true },
	generic: { type: String, required: true },
	categoryId: { type: mongoose.Schema.Types.ObjectId, required: true },
	gender: { type: String, required: true },
	size: {
		height: Number,
		width: Number,
		weight: Number,
	},
	color: { type: String, required: true },
	image: { type: String },
	createAt: { type: Date, default: Date.now },
});

const Pet = mongoose.model("Pet", PetSchema);

module.exports = Pet;
