const {Menu} = require('../models');
const {BaseRepository} = require('./baseRepo');

class MenuRepository extends BaseRepository{
    constructor(args) {
        super(args.connectionString);
    }
    getAllMenus() {
        return new Promise((resolve, reject) => {
            Menu.find({},(err, menues) => {
                if(err) {
                    return reject(err);
                }else if(menues && menues !== undefined && menues !== null) {
                    return resolve(menues);
                } else {
                    return reject(new Error('something bad happened'));
                }
            });
        });
    }
    saveMenu(obj) {
        return new Promise((resolve, reject) => {
            let menu = new Menu(obj);
            menu.save(function (err,doc) {
                if(err) {
                    return reject(err);
                }else if (doc !== undefined && doc !== null) {
                    return resolve(doc);
                }
            });
        });
    }
    removeMenu(id) {
        return new Promise((resolve, reject) => {
            Menu.deleteOne({'_id': id}, (err) => {
                if(err) {
                    return reject(err);
                } else {
                    return resolve(true);
                }
            });
        });
    }
}
module.exports = Object.assign({},{MenuRepository});