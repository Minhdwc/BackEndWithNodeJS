const { ref, required } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    customerId: { type: Schema.Types.ObjectId, ref:'user', required: true },
    date: { type: Date, default:Date.now },
    status: { type: String },
    totalPrice: { type: Number },
    items: {
        pet: [{
            id: { type: Schema.Types.ObjectId },
            quantity: { type: Number },
            price: { type: Number }
        }],
        food: [{
            id: { type: Schema.Types.ObjectId },
            quantity: { type: Number },
            price: { type: Number }
        }],
        accessory:[{
            id: { type: Schema.Types.ObjectId },
            quantity: { type: Number },
            price: { type: Number }
        }]
    }
}
)
const Order = mongoose.model('Order', orderSchema);
module.exports=Order;