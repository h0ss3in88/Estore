const {UserRepository} = require('naData');
const {AuthenticationValidator} = require('./authenticationValidation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
class Authentication {
   constructor(args) {
       this.errors = [];
       this.email = args.email;
       this.password = args.password;
       this.repository = new UserRepository({connectionString: args.connectionString});
       this.validator =new AuthenticationValidator(args.email,args.password,this.errors);
   }
   async authenticateByToken(token, publicKey, verifyOptions) {
       let self = this;
       return new Promise((resolve, reject) => {
           try {
               jwt.verify(token, publicKey,
                   {
                       issuer: verifyOptions.issuer,
                       subject: verifyOptions.subject,
                       audience: verifyOptions.audience,
                       expiresIn: verifyOptions.expiresIn,
                       algorithms: [verifyOptions.algorithm]
                   },async function (err, data) {
                   if (err) {
                       return reject(err);
                   }else {
                       let user = await self.repository.getUserById(data.id);
                       if(!user) {
                           return reject(new Error('invalid token'));
                       }else {
                           return resolve({ 'success': true,'user': user});
                       }
                   }
               });
           } catch (e) {
               return reject(e);
           }
       });
   }
   async authenticate(privateKey,issuer,subject,audience,expiresIn,algorithm) {
       if (this.validator.validate()) {
           try {
               let user = await this.repository.getUserByEmail(this.email);
               if (user !== undefined && user !== null) {
                   // check password matching
                   if (bcrypt.compareSync(this.password, user.hashedPassword)) {
                       // add logs
                       // save into session
                       let logObj = {
                           'title': 'login',
                           'description': 'user login successfully',
                           'user': user._id
                       };
                       let logResult = await this.repository.saveLog(logObj);
                       let userUpdateObj = {
                           'loginCount': user.loginCount + 1,
                           'lastLoginAt': Date.now(),
                           'modifiedAt': Date.now(),
                           '$push' : {'logs': logResult._id}
                       };
                       let userUpdateResult =
                           await this.repository.updateOne(user._id,userUpdateObj);
                       let token = jwt.sign({'_id': userUpdateResult._id, 'email': userUpdateResult.email},privateKey,{
                           issuer: issuer,
                           subject: subject,
                           audience: audience,
                           algorithm: algorithm,
                           expiresIn: expiresIn
                       });
                       return {
                           'user': userUpdateResult.value,
                           'log': Object.assign(logObj, {'_id': logResult.insertedId}),
                           'ok': true,
                           'message': 'user logged in successfully',
                           'token': token
                       }
                   } else {
                       errors.push(new Error('incorrect password or email'));
                       return errors;
                   }
               } else {
                   errors.push(new Error('user does not exist'));
                   return errors;
               }
           }catch (e) {
               console.log(e);
               return e;
           }
       } else {
           return errors;
       }
   }
}
module.exports = Object.assign({},{Authentication});