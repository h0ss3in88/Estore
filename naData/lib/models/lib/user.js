const {Model} = require('mongoose');
const {UserSchema} = require('../../schemas');
const User = new Model('User',UserSchema);

module.exports = Object.assign({},{User});