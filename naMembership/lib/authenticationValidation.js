const validator = require('validator');
class AuthenticationValidator {
    constructor(email,password,errors) {
        this.creds = {};
        this.creds.email = email;
        this.creds.password = password;
        this.errors =errors;
    }
    validate() {
        return checkEmail(this.errors, this.creds) && checkPassword(this.errors, this.creds);
    }
}
const checkEmail = (errors, creds) => {
    if (creds.email === undefined) {
        errors.push(new Error('email does not present'));
        return false;
    } else if (creds.email.indexOf('@') < 0 && validator.isEmail()) {
        errors.push(new Error('invalid email'));
        return false;
    } else {
        return true;
    }
};
const checkPassword = (errors, creds) => {
    if (creds.password === undefined) {
        errors.push(new Error('password required'));
        return false;
    } else if (creds.password.length < 8) {
        errors.push(new Error('password should has strong length 8'));
        return false;
    } else {
        return true;
    }
};
module.exports = Object.assign({},{AuthenticationValidator});