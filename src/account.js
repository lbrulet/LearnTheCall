var schema = require('../index');
var bcrypt = require('bcrypt');
var userMongoose = require('../mongooseCon');

exports.register = function register(username, email, password, callback) {
    bcrypt.hash(password, 5, function (err, hashedPassword) {
        if (err)
            return callback(err);
        userMongoose.User.find({ email: email }, 'username ', function (err, res) {
            if (err)
                return callback(err);
            if (res.length > 0)
                return callback(Error("Email is already used"));
            if (username == res.username)
                return callback(Error("Username is already taken"))
            user = new userMongoose.User();
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
    userMongoose.User.findOne({ username: username }, 'password email', function (err, result) {
        if (err)
            return callback(err);
        if (result.length == 0)
            return callback(Error('Username does not exist'));
        console.log(result.password);
        bcrypt.compare(password, result.password, function (err, result) {
            if (err)
                return callback(err);
            if (!result)
                return callback(Error("Bad password"));
            console.log("user: %s is connected", username);
            return callback(undefined);
        });
    });
}