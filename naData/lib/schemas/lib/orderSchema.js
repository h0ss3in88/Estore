const {Schema} = require('mongoose');
const OrderSchema = new Schema({
    totalPrice: {type: Number},
    shippingDate: {type: Date},
    description: {type: String},
    startedAt: {type: Date, default: Date.now()},
    finishedAt: {type: Date, default: Date.now()},
    orderDate: {type: Date, default: Date.now()},
    shippingAddress: {
        country: {type: String},
        city: {type: String},
        province: {type: String},
        avenue: {type: String},
        alley: {type: String},
        number: {type: String},
        address: {type: String},
        name: {type: String},
    },
    source: {type: String, default: 'Web'},
    customer: { type: Schema.Types.ObjectId , ref: 'Customer'},
    payment: {type: Schema.Types.Mixed},
    status: {type: String, default: 'Registered'},
    orderDetails: [{ quantity: {type: Number , require: true }, product: { type: Schema.Types.ObjectId , ref: 'Product'} , unitPrice: { type: Number }}],
    createdAt: {type: Date, default: Date.now()},
    modifiedAt: {type: Date, default: Date.now()}
});
OrderSchema.virtual('id').get(function () {
    return this._id.toHexString();
});
module.exports = Object.assign({},{OrderSchema});