var mongoose = require('mongoose');
var ConMongoose = require('../mongooseCon');
var jwt = require('jsonwebtoken');

var UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
}, { timestamps: true });

UserSchema.methods.generateJWT = function () {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign({
    email: this.email,
    id: this._id,
    exp: parseInt(expirationDate.getTime() / 1000, 10),
  }, 'secret');
}

UserSchema.methods.toAuthJSON = function () {
  return {
    _id: this._id,
    email: this.email,
    token: this.generateJWT(),
  };
};

let User = mongoose.model('User', UserSchema);

module.exports = { User };