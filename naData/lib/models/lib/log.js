const {model} = require('mongoose');
const {LogSchema} = require('../../schemas');
const Log = new model('Log',LogSchema);
module.exports = Object.assign({},{Log});