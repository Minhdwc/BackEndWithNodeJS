const mongoose = require('mongoose')
const Schema = require('mongoose').Schema
const BrandSchema = new Schema({
    name: { type: String, required: true, unique: true },
    image:{ type: String},
    country:{ type: String, required: true},
    createdAt:{type:Date, default: Date.now()}
})
const brand = mongoose.model('BrandSchema')
module.exports = brand