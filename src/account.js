var sql = require('../sql');
var bcrypt = require('bcrypt');

exports.register = function register(username, email, password, callback) {
    bcrypt.hash(password, 5, function (err, hashedPassword) {
        if (err)
            return callback(err);
        var queryString = "SELECT email FROM users WHERE email = ?";
        sql.con.query(queryString, [email], function (err, result) {
            if (err)
                return callback(err);
            var queryString = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
            sql.con.query(queryString, [username, email, hashedPassword], function (err, result) {
                if (err)
                    return callback(err);
                return callback();
            });
        });
    });
}

exports.login = function login(username, password, callback) {
    var queryString = "SELECT password FROM users WHERE username = ?";
    sql.con.query(queryString, [username], function (err, result) {
        if (err)
            return callback(err)
        if (result.length == 0)
            return callback(Error("User does not exist"));
        bcrypt.compare(password, result[0].password, function (err, result) {
            if (err)
                return callback(err);
            if (!result)
                return callback(Error("Bad password"));
            return callback();
        });
    });
}