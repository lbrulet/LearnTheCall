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
    bcrypt.hash(passwordConfirm, 5, function (err, hashedPassword) {
        if (err)
            return callback(err);
    })
}

exports.login = function login(username, password, callback) {
    User.findOne({ username: username }, 'password email', function (err, resultU) {
        if (err)
            return callback(err, undefined);
        if (!resultU)
            return callback(Error('Username does not exist'), undefined)
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

exports.updateImage = function updateImage(imageObj, callback) {
    Image.updateOne({ image: imageObj.name }, { $set: { goodAnswer: imageObj.goodAnswer } }, function (err, res) {
        if (err)
            return callback(err)
        console.log(res)
        return callback(undefined, "Image updated!")
    })
}

exports.addImage = function addImage(newImage, callback) {
    Image.findOne({ image: newImage.name }, function (err, result) {
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

exports.updateImageUser = function updateImageUser(user, url, callback) {
    User.findOneAndUpdate({ username: user }, { $set: { imageProfile: url } }, function (err) {
        if (err)
            return callback(err)
        return callback(undefined)
    })
}

exports.updateImage = function updateImage(imageObj, callback) {
    Image.updateOne({ image: imageObj.name }, { $set: { goodAnswer: imageObj.goodAnswer } }, function (err, res) {
        if (err)
            return callback(err)
        console.log(res)
        return callback(undefined, "Image updated!")
    })
}

exports.deleteImage = function deleteImage(idImage, callback) {
    Image.findOneAndRemove(idImage, function (err, result) {
        if (err)
            return callback(err);
        else
            return callback(undefined, "Image Deleted !");
    })
}

exports.getAllUsers = function getAllUsers(callback) {
    User.find({}, function (err, result) {
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
    fs.readdir("./src/assets/ImageR6", function (err, files) {
        if (err) {
            console.log(err)
            return callback(err, undefined);
        }
        files.forEach(function (file) {
            console.log(file);
        });
        return callback(undefined, files);
    });
}

exports.addMatch = function addMatch(object, user, callback) {
    User.findOne({ username: user }, function (err, result) {
        if (err)
            return callback(err, undefined)
        result.metadata.unshift(object)
        User.findOneAndRemove({ username: user }, { $set: { metadata: result.metadata } }, function (err) {
            if (err)
                return callback(err, undefined)
            return callback(undefined, "SUCCESS")
        })
    })
}

exports.getThisImage = function getThisImage(ImageName, callback) {
    Image.findOne({ image: ImageName }, function (err, result) {
        if (err || !result) {
            return callback(undefined, "This image doesn't exist");
        } else {
            return callback(undefined, result);
        }
    });
}

exports.getGameById = function getGameById(user, callback) {
    User.findOne({username: user}, function (err, result) {
        if (err)
            return callback(err, undefined);
        else {
            if (result.game)
                return callback(undefined, result.game);
            else
                return callback(undefined, "L'utilisateur n'a pas de partie !");    
        };
    });
}

exports.addGame = function addGame(user, game, callback) {
    User.findOne({username: user}, function (err, result) {
        if (err)
            return callback(err, undefined);
        else {
            result.game.push(game);
            result.save();
            return callback(undefined, "La partie a été ajouté !");
        }    
    });
}