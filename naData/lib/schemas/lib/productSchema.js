const {Schema} = require('mongoose');
const ProductSchema = new Schema({
    title: { type: String , unique: true},
    sku: {type: String},
    description: { type: String , required: false },
    brand: { type: String },
    price: { type: Number},
    discount: { type: String },
    quantity: { type: Number },
    images: {
        thumbnail: [{type: String}],
        larges: [{type: String}]
    },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    isActive: { type: Boolean , default: false },
    startSaleDate: { type: Date, default: Date.now() },
    finishSaleDate: { type: Date, default: Date.now() },
    createdAt: { type: Date, default: Date.now() },
    modifiedAt: { type: Date, default: Date.now() }
});

ProductSchema.virtual('id').get(function () {
    return this._id.toHexString();
});
module.exports = Object.assign({},{ProductSchema});