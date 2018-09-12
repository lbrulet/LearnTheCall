var sql = require('./sql');

function register(username, email, password, callback) {
    bcrypt.hash(password, 5, function (err, hashedPassword) {
        if (err)
            return callback(err);
        var queryString = "SELECT email FROM user WHERE email = ?";
        sql.con.query(queryString, [email], function(err, result) {
            if (err)
                return callback(err);
            if (result.length == 0)
                return callback(Error("User not found"));
            var queryString = "INSERT INTO user (username, email, password) VALUES (?, ?, ?)";
            sql.con.query(queryString, [username, email, hashedPassword], function(err, result) {
                if (err)
                    return callback(err);
                return callback();                
            });
        });
    });
}