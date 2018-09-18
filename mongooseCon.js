var mongoose = require('mongoose');
var schema = require('./src/userSchema');

mongoose.model('User', schema.UserSchema);

mongoose.connect('mongodb://sankamille:jesuisunbg@localhost:27017/LearnTheCall', { useNewUrlParser: true }, function (err) {
    if (err) {
        throw err;
    }
    console.log("Connected on mongodb");
});

exports.User = mongoose.model('User');