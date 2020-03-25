const {Category} = require('../models');
const {BaseRepository} = require('./baseRepo');

class CategoryRepository extends BaseRepository{
    constructor(args) {
        super(args.connectionString);
    }
    getAllCategories() {
        return new Promise((resolve, reject) => {
            Category.find({},(err, categories) => {
                if(err) {
                    return reject(err);
                }else if(categories && categories !== undefined && categories !== null) {
                    return resolve(categories);
                } else {
                    return reject(new Error('something bad happened'));
                }
            });
        });
    }
    saveCategory(obj) {
        return new Promise((resolve, reject) => {
            let category = new Category(obj);
            category.save(function (err,doc) {
                if(err) {
                    return reject(err);
                }else if (doc !== undefined && doc !== null) {
                    return resolve(doc);
                }
            });
        });
    }
    removeCategory(id) {
        return new Promise((resolve, reject) => {
            Category.deleteOne({'_id': id}, (err) => {
                if(err) {
                    return reject(err);
                } else {
                    return resolve(true);
                }
            });
        });
    }
}
module.exports= Object.assign({},{CategoryRepository});