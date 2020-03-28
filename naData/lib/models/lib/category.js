const {model} = require('mongoose');
const {CategorySchema} = require('../../schemas');
const Category = new model('Category',CategorySchema);
module.exports = Object.assign({},{Category});