const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name:{type: String},
    dateOfBirth:{type:Date}
});

const User = mongoose.model('User', UserSchema)

module.exports = User;