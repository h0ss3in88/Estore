const {Model} = require('mongoose');
const {LogSchema} = require('../../schemas');
const Log = new Model('Log',LogSchema);
module.exports = Object.assign({},{Log});