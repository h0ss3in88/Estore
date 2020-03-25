const {Schema} = require('mongoose');
const LogSchema = new Schema({
    title: { type: String},
    description: { type: String , required: false},
    successful: { type: Boolean , default : true},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    createdAt: { type: Date, default: Date.now()},
    modifiedAt: { type: Date, default: Date.now()}
});

module.exports = Object.assign({},{LogSchema});