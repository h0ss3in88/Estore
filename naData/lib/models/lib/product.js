const {model} = require('mongoose');
const {ProductSchema} = require('../../schemas');
const Product = new model('Product',ProductSchema);
module.exports = Object.assign({},{Product});
