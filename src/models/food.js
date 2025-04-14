const mongoose = require("mongoose")

const foodSchema = new mongoose.Schema({
    name: {type: String, require: true},
    description:{type: String},
    price:{type: number, require: true},
    brand: {type: mongoose.Schema.Types.ObjectId, ref: "Brand"},
    type: {type: mongoose.Schema.Types.ObjectId, ref: "Category"},
    stock: {type: number, require: true},
    createAt: {type: Date, default: Date.now()}
})
const Food = mongoose.model("Food", foodSchema)
module.exports = Food