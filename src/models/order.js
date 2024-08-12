const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    id: { type: String },
    customerId: { type: String },
    date: { type: Date },
    status:{ type: String },
    totalPrice:{type: Number},
    items:[{
        petId: { type: String},
        foodId: { type: String },
        accessoryId:{ type: String },
        
    }]
})