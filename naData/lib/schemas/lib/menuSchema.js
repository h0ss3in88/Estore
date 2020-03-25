const {Schema} = require('mongoose');
const MenuSchema = new Schema({
    title: {type: String, required: true},
    order: {type: Number},
    isActive: {type: Boolean, default: true},
    description: {type: String , required: false},
    createdAt: {type: Date, default: Date.now()},
    modifiedAt: {type: Date, default: Date.now()}
});

module.exports = Object.assign({},{MenuSchema});