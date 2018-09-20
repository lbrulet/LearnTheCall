var schema = require('../index');
var bcrypt = require('bcrypt');
var { User } = require('./userSchema');
var { Image } = require('./ImageSchema');

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
    User.findOne({ username: username }, 'password email', function (err, result) {
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
            User.find({}, function (err, users) {
                var userMap = {};

                users.forEach(function (user) {
                    console.log(user);
                });
            });
            return callback(undefined);
        });
    });
}

exports.getAllImage = function getAllImage(callback) {
    /*
    let test = new Image()

    test.image = "ererlererl";
    test.responseOne = "erer";
    test.responseTwo = "lmvmv";
    test.responseThree = "qqssqqs";
    test.responseFour = "eererer";
    test.goodAnswer = "eerre";

    test.save
    */
    Image.find({}, function (err, data) {
        if (err) {
            console.log("err");
            return callback(err, undefined);
        }
        var userMap = {};
        data.forEach(function (data) {
            console.log(data);
            userMap[data._id] = data;
        });
        return callback(undefined, userMap);
    });
}