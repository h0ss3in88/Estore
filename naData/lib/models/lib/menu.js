const {model} = require('mongoose');
const {MenuSchema} = require('../../schemas');
const Menu = new model('Menu',MenuSchema);
module.exports = Object.assign({},{Menu});