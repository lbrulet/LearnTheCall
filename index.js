var _ = require("lodash");
var express = require("express");
var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');
var path = require("path");
var ejs = require('ejs');
var passport = require("passport");
var config = require('./config');
var api = require('./src/api');
var app = express();

passport.use(config.strategy);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', api);
app.use(passport.initialize());
app.use('/public', express.static(path.join(__dirname, '/public')));

app.set('views', __dirname + '/views');
app.set('view engine', 'html');

app.engine('html', ejs.renderFile);

app.get('/', function (req, res) {
    res.redirect('login');
});

app.get('/login', function (req, res) {
    res.render('login');
});

app.get('/home', function (req, res) {
    res.render('home');
});

app.get("/secret", passport.authenticate('jwt', { session: false }), function (req, res) {
    res.json({ message: "Success! You can not see this without a token" });
});

app.listen(4567, "localhost", function (req, res) {
    console.log("Server launched on localhost:4567");
});