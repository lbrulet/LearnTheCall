var bodyParser = require('body-parser');
var http = require('http');
var express = require("express");
var ejs = require("ejs");
var path = require("path");
var api = require('./src/account');
var sql = require('./sql');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', __dirname + '/views');
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.use('/public', express.static(path.join(__dirname, '/public')));
app.get('/', function (req, res) {
    res.redirect('login');
});

app.get('/login', function (req, res) {
    res.render('login');
});

app.get('/home', function (req, res) {
    res.render('home');
});

app.post('/api/login', function (req, res) {
    if (req.body.person.usernameLogin == undefined || req.body.person.usernameLogin.length == 0 ||
        req.body.person.password == undefined || req.body.person.password.length == 0)
        res.status(403).send({ warning: "Empty field" });
    else {
        api.login(req.body.person.usernameLogin, req.body.person.password, function (err) {
            if (err)
                res.status(403).send({ waring: "Username or password is incorrect" });
            else
                res.status(200).send({ message: "Success" });
        });
    }
});

app.post('/api/register', function (req, res) {
    if (req.body.person.usernameRegister == undefined || req.body.person.usernameRegister.length == 0 ||
        req.body.person.email == undefined || req.body.person.email.length == 0 ||
        req.body.person.password == undefined || req.body.person.password.length == 0 ||
        req.body.person.passwordConfirm == undefined || req.body.person.passwordConfirm.length == 0)
        res.status(403).send({ warning: "Empty field" });
    else if (req.body.person.password != req.body.person.passwordConfirm)
        res.status(403).send({ warning: "Passwords are the same" });
    else {
        api.register(req.body.person.usernameRegister, req.body.person.email, req.body.person.password, function (err) {
            if (err)
                res.status(403).send({ warning: "User unknown" });
            else
                res.status(200).send({ message: "success" });
        });
    }
});

app.listen(4567, "localhost", function (req, res) {
    console.log("Server launched on localhost:4567");
});