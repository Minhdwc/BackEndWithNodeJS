const mongoose = require("mongoose")

const accessorySchema = mongoose.Schema({
    name: {type: String, required: true},
    description: { type: String },
    price: { type: Number, required: true},
    stock: { type: Number },
    image_url: { type: String},
    created_at: { type: Date, default: Date.now()}
})

const Accessory =  mongoose.model("Accessory", accessorySchema)
module.exports = Accessory