const {Model} = require('mongoose');
const {CategorySchema,ProductSchema,UserSchema,LogSchema,OrderSchema} = require('../../schemas');
const User = new Model('User',UserSchema);
const Log = new Model('Log',LogSchema);
const Category = new Model('Category',CategorySchema);
const Product = new Model('Product',ProductSchema);
const Order = new Model('Order',OrderSchema);

module.exports = Object.assign({},{User,Log,Category,Product,Order});