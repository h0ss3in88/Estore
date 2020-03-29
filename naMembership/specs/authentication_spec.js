const should = require('should');
const fs = require('fs');
const path = require('path');
const {Authentication} = require('../lib/authentication');
const {Registration} = require('../lib/registration');

describe('Authentication Process', function () {
    let token  ='';
    let pvK = fs.readFileSync(path.resolve(__dirname,'private.key'),'utf8');
    let pbK = fs.readFileSync(path.resolve(__dirname,'public.key'),'utf8');
    before(async function () {
        let validInputs = {
            email: 'test@gmail.com',
            password: 'test@123456',
            confirm: 'test@123456',
            connectionString: 'mongodb://localhost:27017/naStoreTest'
        };
        let signOptions = {
            issuer:  'mocha test runner',
            subject:  'test membership module jwt ',
            audience:  'mocha client test runner',
            algorithm: 'RS256',
            expiresIn: 86400
        };
        let reg = new Registration(validInputs);
        try {
            let result = await reg.register(pvK, signOptions);
            token = result.token;
        }catch (e) {
            throw e;
        }
    });
    describe('authenticate by valid email and password', async function () {
        let result = {};
        let errors = {};
        before(async function () {
            try {
                let validCreds = {
                    email: 'test@gmail.com',
                    password: 'test@123456',
                    connectionString: 'mongodb://localhost:27017/naStoreTest'
                };
                let authOptions = {
                    issuer: 'mocha test runner',
                    subject: 'test membership module jwt ',
                    audience: 'mocha client test runner',
                    algorithm: 'RS256',
                    expiresIn: 86400
                };
                let auth = new Authentication(validCreds);
                result = await auth.authenticateByToken(token, pbK, authOptions);
            }catch (e) {
                errors = e;
            }
        });
        it('user logged in successfully', function () {
            should(result).not.be.null();
            should(result.success).be.true();
            should(result.user).not.be.undefined().and.not.null();
            should(result.user).has.property('_id');
        });
    });
});