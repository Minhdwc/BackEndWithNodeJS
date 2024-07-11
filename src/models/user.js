const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = new Schema({
    id:{type: 'string'},
    name:{type: 'string'},
    dateOfBirth:{type:'Date'}
});