const {Model} = require('mongoose');
const {MenuSchema} = require('../../schemas');
const Menu = new Model('Menu',MenuSchema);
module.exports = Object.assign({},{Menu});