const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accessorySchema = new Schema({
    id:{type: String},
    name:{type: String},
    categoryAccessory:{type: String},
    price:{type: Number}
})

const Accessory = mongoose.model('Accessory', accessorySchema);
module.exports = Accessory;