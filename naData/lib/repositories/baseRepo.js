const mongoose = require('mongoose');
class BaseRepository {
    constructor(connectionString) {
        mongoose.connect(connectionString,{useNewUrlParser: true, useUnifiedTopology: true});
        this.connection = mongoose.connection;
        this.connection.on('open', () => {
           console.log('connected to mongodb successfully');
        });
        this.connection.on('error', (error) => {
            throw new Error(error.message);
        });
    }
}
module.exports = Object.assign({},{BaseRepository});