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

app.get('/api/allUsers', function (req, res) {
    api.getAllUsers(function(err, users) {
        if (err)
            res.status(403).send({message: "error"});
        else
            res.status(200).send({message: users});
    });
});

app.get('/login', function (req, res) {
    res.render('login');
});

app.get('/home', function (req, res) {
    res.render('home');
});

<<<<<<< HEAD
app.get('/game', function (req, res) {
    res.render('game');
});

app.post('/login', function (req, res) {
    res.render('login');
});

app.post('/api/login', function (req, res) {
    if (req.body.person.usernameLogin == undefined || req.body.person.usernameLogin.length == 0 ||
        req.body.person.password == undefined || req.body.person.password.length == 0)
        res.status(403).send({ message: 'error' });
    else {
        api.login(req.body.person.usernameLogin, req.body.person.password, function (err) {
            if (err) {
                console.log(err);
                res.status(403).send({ message: 'error' });
            }
            else {
                console.log("success");
                res.status(200).send({ message: 'success' });
            }
        });
    }
});

app.get('/api/getAllImage', function (req, res) {
    api.getAllImage(function (err, result) {
        if (err) {
            console.log("error GetAllImage !");
            res.status(403).send({ message: "Error" });
        } else {
            res.status(200).send({ message: result });
        }
    });
});

app.post('/api/register', function (req, res) {
    console.log("register");
    if (req.body.person.usernameRegister == undefined || req.body.person.usernameRegister.length == 0 ||
        req.body.person.email == undefined || req.body.person.email.length == 0 ||
        req.body.person.password == undefined || req.body.person.password.length == 0 ||
        req.body.person.passwordConfirm == undefined || req.body.person.passwordConfirm.length == 0)
        res.status(403).send({ message: 'error' });
    else if (req.body.person.password != req.body.person.passwordConfirm)
        res.status(403).send({ message: 'error' });
    else {
        api.register(req.body.person.usernameRegister, req.body.person.email, req.body.person.password, function (err) {
            if (err)
                res.status(403).send({ message: 'error' });
            else
                res.status(200).send({ message: 'success' });
        });
    }
=======
app.get("/secret", passport.authenticate('jwt', { session: false }), function (req, res) {
    res.json({ message: "Success! You can not see this without a token" });
>>>>>>> 9513590e507e838bf0d04fe06063bbb2ee3b3203
});

app.listen(4567, "localhost", function (req, res) {
    console.log("Server launched on localhost:4567");
});