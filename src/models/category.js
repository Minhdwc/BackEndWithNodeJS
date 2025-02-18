const mongoose = require("mongoose");
//Loại
const categorySchema = new mongoose.Schema({
	name: { type: String, required: true },
	description: { type: String},
	typeOf:{type: String, enum:["Food", "Pet", "Assessory"]}
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
