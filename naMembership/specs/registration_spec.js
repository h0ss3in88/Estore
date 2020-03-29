const should = require('should');
const {Registration} = require('../lib/registration');

describe('Registration Process', function () {
    describe('registration by valid application', function () {
        let result = {};
        let errors = {};
        before(async function () {
            let validInputs = {
                email: 'test@gmail.com',
                password: 'test@123456',
                confirm: 'test@123456',
                connectionString: 'mongodb://localhost:27017/naStoreTest'
            };
            let reg = new Registration(validInputs);
            try {
                result = await reg.register();
            }catch (e) {
                errors = e;
            }
        });
        it('user saved to database successfully', function () {
            should(result).not.be.null();
            should(result.ok).be.true();
            !should(result.log).not.be.undefined().and.not.null();
        });
    });
});