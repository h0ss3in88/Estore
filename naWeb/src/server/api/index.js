const {ping} = require('./lib/ping');

const api = (app) => {
    app.use('/api',ping);
};
module.exports = Object.assign({},{api});