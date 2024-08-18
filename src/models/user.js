const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name:{type: String},
    dateOfBirth:{type:Date},
    email:{type: String, unique: true},
    password: {type: String},
    comfirmPassword: {type: String},
    role: {type: String, enum: ["admin", "user"], default: "user"}
});

const User = mongoose.model('User', UserSchema)

module.exports = User;