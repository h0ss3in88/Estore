const {model} = require('mongoose');
const {OrderSchema} = require('../../schemas');
const Order = new model('Order',OrderSchema);
module.exports = Object.assign({},{Order});