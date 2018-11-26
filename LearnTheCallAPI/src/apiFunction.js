var schema = require('../index');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var { User } = require('../models/userSchema');
var config = require('../config');
var { Image } = require('../models/ImageSchema');
var fs = require('fs');

exports.register = function register(username, email, password, callback) {
    bcrypt.hash(password, 5, function (err, hashedPassword) {
        if (err)
            return callback(err);
        User.find({ email: email }, 'username ', function (err, res) {
            if (err)
                return callback(err);
            if (res.length > 0)
                return callback(Error("Email is already used"));
            if (username == res.username)
                return callback(Error("Username is already taken"))
            user = new User();
            user.username = username;
            user.email = email;
            user.password = hashedPassword;
            user.save(function (err) {
                if (err)
                    return callback(err);
                return callback();
            });
        });
    });
}

exports.updatePassword = function updatePassword(password, passwordConfirm, callback) {
    bcrypt.hash(passwordConfirm, 5, function(err, hashedPassword) {
        if (err)
            return callback(err);
    })
}

exports.login = function login(username, password, callback) {
    User.findOne({ username: username }, 'password email', function (err, resultU) {
        if (err)
            return callback(err, undefined);
        if (resultU.length == 0)
            return callback(Error('Username does not exist'), undefined);
        bcrypt.compare(password, resultU.password, function (err, result) {
            if (err)
                return callback(err, undefined);
            if (!result)
                return callback(Error("Bad password"), undefined);
            var payload = { id: resultU.id };
            var token = jwt.sign(payload, config.jwtOptions.secretOrKey);
            return callback(undefined, { token, username });
        });
    });
}

exports.addImage = function addImage(newImage, callback) {
    Image.findOne({ image: newImage.name }, function (err, result)  {
        if (err)
            return callback(err);
        if (result)
            return callback(Error("Image already existed"));
        image = new Image();
        image.image = newImage.name;
        image.responseOne = newImage.responseOne;
        image.responseTwo = newImage.responseTwo;
        image.responseThree = newImage.responseThree;
        image.responseFour = newImage.responseFour;
        image.goodAnswer = newImage.goodAnswer;
        image.save(function (err) {
            if (err)
                return callback(err);
            return callback();
        });
    });
}

exports.getAllUsers = function getAllUsers(callback) {
    User.find({},function(err, result) {
      if (err)
        return callback(err, undefined);
    return callback(undefined, result);
    });
}


exports.getAllImage = function getAllImage(callback) {
    Image.find({}, function (err, data) {
        if (err)
            return callback(err, undefined);
        return callback(undefined, data);
    });
}

exports.getImageInFolder = function getImageInFolder(callback) {
    fs.readdir("./ImageR6/", function(err, files) {
        if (err) {
           return callback(err, undefined);
        }
        files.forEach(function (file) {
           console.log(file);
        });
        return callback(undefined, files);
    });
}