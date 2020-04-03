const {Router} = require('express');
const sts = require('http-status');
const ping = Router();
ping.get('/ping', (req, res) => {
    return res.status(sts.OK).json({'ping': 'pong'});
});
module.exports = Object.assign({}, {ping});