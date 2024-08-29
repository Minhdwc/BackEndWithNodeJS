const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodSchema = new Schema({
    name:{type: String},
    categoryPet:{type: String},
    Price:{type: Number},
    Image:{type: String}
});

const Food = mongoose.model('Food', foodSchema);
module.exports = Food;