const {Order} = require('../models');
const {BaseRepository} = require('./baseRepo');

class OrderRepository extends BaseRepository{
    constructor(args) {
        super(args.connectionString);
    }
    getAllOrders() {
        return new Promise((resolve, reject) => {
            Order.find({},(err, orders) => {
                if(err) {
                    return reject(err);
                }else if(orders && orders !== undefined && orders !== null) {
                    return resolve(orders);
                } else {
                    return reject(new Error('something bad happened'));
                }
            });
        });
    }
    getOrderById(id) {
        return new Promise((resolve, reject) => {
            Order.findOne({'_id': id},(err, order) => {
                if(err) {
                    return reject(err);
                }else if(order && order !== undefined && order !== null) {
                    return resolve(order);
                } else {
                    return reject(new Error('something bad happened'));
                }
            });
        });
    }
    saveOrder(obj) {
        return new Promise((resolve, reject) => {
            let order = new Order(obj);
            order.save((err,doc) => {
                if(err) {
                    return reject(err);
                } else {
                    return resolve(doc);
                }
            });
        });
    }
    removeOrder(id) {
        Order.deleteOne({'_id': id}, error => {
            if(error) {
                return reject(error);
            } else {
                return resolve(true);
            }
        });
    }
}
module.exports= Object.assign({},{OrderRepository});