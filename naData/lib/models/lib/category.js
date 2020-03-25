const {Model} = require('mongoose');
const {CategorySchema} = require('../../schemas');
const Category = new Model('Category',CategorySchema);
module.exports = Object.assign({},{Category});