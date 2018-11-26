var {User} = require('./models/userSchema');
var passportJWT = require("passport-jwt");

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'tasmanianDevil';

exports.jwtOptions = jwtOptions;

exports.strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
    console.log('payload received', jwt_payload);
    User.findOne({ _id: jwt_payload.id }, function (err, user) {
        if (err)
            next(null, false);
        if (user)
            next(null, user);
        else
            next(null, false);
    });
});
