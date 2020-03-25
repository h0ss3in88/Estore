const {Model} = require('mongoose');
const {ProductSchema} = require('../../schemas');
const Product = new Model('Product',ProductSchema);
module.exports = Object.assign({},{Product});
