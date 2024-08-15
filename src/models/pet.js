const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PetSchema = new Schema({
    name:{type:String, required:true},
    species:{type: String},
    generic:{type: String},
    category:{type: String},
    gender:{type: String},
    size:{
        height: Number,
        width: Number,
        weight: Number
    },
    color:{type:String}
})

const Pet = mongoose.model('Pet', PetSchema);

module.exports = Pet;