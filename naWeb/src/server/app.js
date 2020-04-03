const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const responseTime = require('response-time');
const logger = require('morgan');
const {api} = require('./api');

let app = express();
app.use(logger('dev'));
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('port', process.env.PORT || 3600);
app.set('x-powered-by', false);
app.use(responseTime());
api(app);
app.get('/', (req, res, next) => {
    return res.json({'message': 'Hello World'});
});

module.exports = Object.assign({}, {app});