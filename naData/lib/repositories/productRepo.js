const {Product} = require('../models');
const {BaseRepository} = require('./baseRepo');

class ProductRepository extends BaseRepository{
    constructor(args) {
        super(args.connectionString);
    }
    getAllProducts() {
        return new Promise((resolve, reject) => {
            Product.find({},(err, products) => {
                if(err) {
                    return reject(err);
                }else if(products && products !== undefined && products !== null) {
                    return resolve(products);
                } else {
                    return reject(new Error('something bad happened'));
                }
            });
        });
    }
    getProductById(id) {
        return new Promise((resolve, reject) => {
            Product.findOne({'_id': id},(err, product) => {
                if(err) {
                    return reject(err);
                }else if(product && product !== undefined && product !== null) {
                    return resolve(product);
                } else {
                    return reject(new Error('something bad happened'));
                }
            });
        });
    }
    saveProduct(obj) {
        return new Promise((resolve, reject) => {
            let product = new Product(obj);
            product.save(function (err,doc) {
                if(err) {
                    return reject(err);
                }else if (doc !== undefined && doc !== null) {
                    return resolve(doc);
                }
            });
        });

    }
    removeProduct(id) {
        return new Promise((resolve, reject) => {
            Product.deleteOne({'_id': id}, (err) => {
                if(err) {
                    return reject(err);
                } else {
                    return resolve(true);
                }
            });
        });
    }
}
module.exports= Object.assign({},{ProductRepository});