const {Schema} = require('mongoose');
const UserSchema = new Schema({
    userName: {type: String, unique: true},
    email: {type: String, unique: true},
    hashedPassword: {type: String, required: true},
    isActive: {type: Boolean, default: false},
    lastLoginAt: {type: Date, default: Date.now()},
    profile: {
        firstName: {type: String},
        lastName: {type: String},
        age: {type: Number, required: false},
        birthDate: {type: Date, required: false},
        required: false
    },
    role: {type: String, default: 'Customer'},
    location: { type: { type: String}, coordinates: [Number]},
    loginCount: {type: Number, default: 1},
    logs: [{type: Schema.Types.ObjectId, ref: 'Log'}],
    createdAt: {type: Date, default: Date.now()},
    modifiedAt: {type: Date, default: Date.now()}
});
UserSchema.virtual('id').get(function () {
    return this._id.toHexString();
});
UserSchema.virtual('fullName').get(function () {
    return `${this.profile.firstName} ${this.profile.lastName}`;
});
UserSchema.index({ location : '2dsphere'});
module.exports = Object.assign({},{UserSchema});