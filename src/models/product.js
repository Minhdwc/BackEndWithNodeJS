const mongoose = require('mongoose');
const product =  mongoose.Schema({
    name:{type: String, required: true},
    price:{type: Number, required: true},
    stock:{type: Number, required: true},
    description:{type: String},
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
})

const Product = mongoose.model('Product', product);
module.exports = Product;