const {User,Log} = require('../models');
const {BaseRepository} = require('./baseRepo');

class UserRepository extends BaseRepository{
    constructor(args) {
        super(args.connectionString);
    }
    getUserByEmail(email) {
        return new Promise((resolve, reject) => {
            User.findOne({'email': email},(err, user) => {
                if(err) {
                    return reject(err);
                }else if(user && user !== undefined && user !== null) {
                    return resolve(user);
                } else {
                    return reject(new Error('something bad happened'));
                }
            });
        });
    }
    saveUser(obj) {
        return new Promise((resolve, reject) => {
            let user = new User(obj);
            user.save(function (err,doc) {
                if(err) {
                    return reject(err);
                }else if (doc !== undefined && doc !== null) {
                    return resolve(doc);
                }
            });
        });
    }
    saveLog(obj) {
        return new Promise((resolve, reject) => {
            let log = new Log(obj);
            log.save(function (err,doc) {
                if(err) {
                    return reject(err);
                }else if (doc !== undefined && doc !== null) {
                    return resolve(doc);
                }
            });
        });
    }
    getAllUsers() {
        return new Promise((resolve, reject) => {
            User.find({},(err, users) => {
                if(err) {
                    return reject(err);
                }else if(users && users !== undefined && users !== null) {
                    return resolve(users);
                } else {
                    return reject(new Error('something bad happened'));
                }
            });
        });
    }
    getAllUserLog(userId) {
        return new Promise((resolve, reject) => {
            Log.find({user: userId},(err, logs) => {
                if(err) {
                    return reject(err);
                }else if(logs && logs !== undefined && logs !== null) {
                    return resolve(logs);
                } else {
                    return reject(new Error('something bad happened'));
                }
            });
        });
    }
    getAllLogs() {
        return new Promise((resolve, reject) => {
            Log.find({},(err, logs) => {
                if(err) {
                    return reject(err);
                }else if(logs && logs !== undefined && logs !== null) {
                    return resolve(logs);
                } else {
                    return reject(new Error('something bad happened'));
                }
            });
        });
    }
    getUserById(id) {
        return new Promise((resolve, reject) => {
            User.findOne({'_id': id},(err, user) => {
                if(err) {
                    return reject(err);
                }else if(user && user !== undefined && user !== null) {
                    return resolve(user);
                } else {
                    return reject(new Error('something bad happened'));
                }
            });
        });
    }
    removeUser(id) {
        return new Promise((resolve, reject) => {
            User.deleteOne({'_id': id}, (err) => {
                if(err) {
                    return reject(err);
                } else {
                    return resolve(true);
                }
            });
        });
    }
    removeLog(id) {
        return new Promise((resolve, reject) => {
            Log.deleteOne({'_id': id}, (err) => {
                if(err) {
                    return reject(err);
                } else {
                    return resolve(true);
                }
            });
        });
    }
    updateOne(id,obj) {
        return new Promise((resolve, reject) => {
            User.findByIdAndUpdate(id,obj,(err, res) => {
                if(err) {
                    return reject(err);
                }else {
                    return resolve(res);
                }
            });
        });
    }
}
module.exports= Object.assign({},{UserRepository});