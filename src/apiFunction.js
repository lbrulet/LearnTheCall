var schema = require('../index');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var { User } = require('../models/userSchema');
var config = require('../config');

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
                console.log(user);
                return callback();
            });
        });
    });
}

exports.login = function login(username, password, callback) {
    User.findOne({ username: username }, 'password email', function (err, resultU) {
        if (err)
            return callback(err, undefined);
        if (resultU.length == 0)
            return callback(Error('Username does not exist'), undefined);
            console.log(resultU._id);
            bcrypt.compare(password, resultU.password, function (err, result) {
            if (err)
                return callback(err, undefined);
            if (!result)
                return callback(Error("Bad password"), undefined);
            console.log(resultU.id + " sexe");
            var payload = {id: resultU.id};
            var token = jwt.sign(payload, config.jwtOptions.secretOrKey);
            return callback(undefined, { Bearer: token });
        });
    });
}

exports.getAllImage = function getAllImage(callback) {
    Image.find({}, function (err, users) {
        if (err)
            return callback(err, undefined);
        var userMap = {};
        users.forEach(function (user) {
            userMap[user._id] = user;
        });
        return callback(undefined, userMap);
    });
}