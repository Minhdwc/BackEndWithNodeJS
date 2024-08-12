const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    id:{type: 'string'},
    name:{type: 'string'},
    dateOfBirth:{type:'Date'}
});

const User = mongoose.model('User', UserSchema)

module.exports = User;