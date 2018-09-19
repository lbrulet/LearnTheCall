var mongoose = require('mongoose');

mongoose.connect('mongodb://corentin:corentin123@localhost:27017/LearnTheCall', { useNewUrlParser: true }, function (err) {
    if (err) {
        throw err;
    }
    console.log("Connected on mongodb");
});