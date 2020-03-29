const {UserRepository} = require('naData');
const {RegistrationValidator} = require('./registrationValidator');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');
class Registration {
    constructor(args) {
        this.errors = [];
        this.email = args.email;
        this.password = args.password;
        this.confirm = args.confirm;
        this.repository = new UserRepository({connectionString: args.connectionString});
        this.validator = new RegistrationValidator(args.email, args.password, args.confirm, this.errors);
    }

    async register(privateKey,signOptions) {
        if (this.validator.validate(this.email,this.password,this.confirm, this.errors)) {
            // check email does not exist already
            try {
                let user = await this.repository.getUserByEmail(this.email);
                if (user !== undefined && user !== null) {
                    return new Error('user already exist');
                } else {
                    // create hashedPassword
                    let hp = bcrypt.hashSync(this.password, 8);
                    // save user into database
                    let userObj = {
                        'userName': this.email,
                        'email': this.email,
                        'hashedPassword': hp,
                        'isActive': true,
                    };
                    let userResult = await this.repository.saveUser(userObj);
                    if (validator.isMongoId(userResult._id.toString()) && userResult !== null && userResult !== undefined) {
                        let userObjId = userResult._id;
                        // add log for user
                        let logObj = { 'title': 'registration', 'description': 'user sign up successfully', 'successful': true, 'user': userObjId };
                        let logResult = await this.repository.saveLog(logObj);
                        await this.repository.updateOne(userObjId,{ '$push': { 'logs': logResult._id}});
                        let token = jwt.sign({ 'id' : userResult._id, 'email': userResult.email }, privateKey,
                            { issuer:  signOptions.issuer,
                                subject:  signOptions.subject,
                                audience:  signOptions.audience,
                                algorithm: 'RS256',
                                expiresIn: 86400
                            });
                        return {
                            'token': token,
                            'ok': true
                        };
                    }else{
                        this.errors.push(new Error('Internal error for registration user'));
                        return this.errors;
                    }
                }
            } catch (error) {
                return error;
            }
        } else {
            return errors;
        }
    }
}

module.exports = Object.assign({},{Registration});