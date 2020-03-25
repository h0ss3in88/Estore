const {Schema} = require('mongoose');
const CategorySchema = new Schema({
    title: { type: String },
    description: { type: String , required: false },
    isActive: { type: Boolean , default: true },
    products: { type: Schema.Types.ObjectId, ref: 'Product'},
    createdAt: { type: Date, default: Date.now() },
    modifiedAt: { type: Date, default: Date.now() }
});

module.exports = Object.assign({},{CategorySchema});