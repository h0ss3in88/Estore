const {model} = require('mongoose');
const {UserSchema} = require('../../schemas');
const User = new model('User',UserSchema);

module.exports = Object.assign({},{User});