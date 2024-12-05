const mongoose = require('mongoose')
const cartSchema = new mongoose.Schema({
    total: {type: Number, required: true},
    Item:[
        {
            idItem: {type: mongoose.Schema.Types.ObjectId},
            quantity: {type: Number, required: true},
            price: {type: Number, required: true},
            totalPrice:{type: Number},
            image:{ type: String},
            category: {type: String}
        },
    ],
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    
})
const Cart = mongoose.model('Cart', cartSchema)
module.exports = Cart