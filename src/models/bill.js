const mongoose = require('mongoose')
const billSchema = mongoose.Schema({
    total: {type: number, required: true},
    quantity:{type: number, required: true},
    delivery_location: {
        city, district, street, number_house
    },
    type_pay:{ type: String},
    status:{type: String, enum: ["Chưa thanh toán", "Đang thanh toán", "Đã thanh toán", "Đang giao", "Đã giao"]},
    timestamp:{type: Date, default: Date.now}
})
const Bill = mongoose.model('Bill', billSchema)
module.exports = Bill