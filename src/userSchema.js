var mongoose = require('mongoose');

exports.UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
  }, { timestamps: true });