var _ = require("lodash");
var express = require("express");
var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');
var path = require("path");
var ejs = require('ejs');
var passport = require("passport");
var config = require('./config');
var api = require('./src/api');
var cors = require('cors');
var app = express();

passport.use(config.strategy);

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}

app.use(cors(corsOptions));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', api);
app.use(passport.initialize());

app.get('/', function (req, res) {
    res.json({message: "API LEARN THE CALL @https://github.com/lbrulet/LearnTheCall"});
});

app.get("/secret", passport.authenticate('jwt', { session: false }), function (req, res) {
    res.json({ message: "Success! You can not see this without a token" });
});

app.listen(5000, "54.38.184.10", function (req, res) {
    console.log("Server launched on 54.38.184.10:4567");
});
