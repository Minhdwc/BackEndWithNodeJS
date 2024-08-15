const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    customerId: { type: String },
    date: { type: Date },
    status: { type: String },
    totalPrice: { type: Number },
    items: {
        pet: [{
            id: { type: String },
            quantity: { type: Number },
            price: { type: Number }
        }],
        food: [{
            id: { type: String },
            quantity: { type: Number },
            price: { type: Number }
        }],
        accessory:[{
            id: { type: String },
            quantity: { type: Number },
            price: { type: Number }
        }]
    }
}
)