const {UserRepository} = require('./lib/repositories/userRepo');
const {MenuRepository} = require('./lib/repositories/MenuRepo');
const {CategoryRepository} = require('./lib/repositories/categoryRepo');
const {ProductRepository} = require('./lib/repositories/productRepo');
const {OrderRepository} = require('./lib/repositories/orderRepo');

module.exports= Object.assign({},{UserRepository,MenuRepository,CategoryRepository,ProductRepository,OrderRepository});