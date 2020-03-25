const {Model} = require('mongoose');
const {OrderSchema} = require('../../schemas');
const Order = new Model('Order',OrderSchema);
module.exports = Object.assign({},{Order});