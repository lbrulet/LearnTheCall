var express = require('express');
var router = express.Router();
var apiFunction = require('./apiFunction');

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.post('/login', function (req, res) {
    if (req.body.usernameLogin == undefined || req.body.usernameLogin.length == 0 ||
        req.body.password == undefined || req.body.password.length == 0)
        res.status(403).send({ message: 'error' });
    else {
        apiFunction.login(req.body.usernameLogin, req.body.password, function (err, Bearer) {
            if (err) {
                console.log(err);
                res.status(403).send({ message: 'error' });
            }
            else {
                console.log("success");
                console.log(Bearer);
                res.status(200).send({ Bearer });
            }
        });
    }
});

router.post('/getAllImage', function (req, res) {
    apiFunction.getAllImage(function (err, result) {
        if (err)
            res.status(403).send({ message: "Error" });
        else
            res.status(200).send({ message: result });
    });
});

router.post('/register', function (req, res) {
    console.log("register");
    if (req.body.person.usernameRegister == undefined || req.body.person.usernameRegister.length == 0 ||
        req.body.person.email == undefined || req.body.person.email.length == 0 ||
        req.body.person.password == undefined || req.body.person.password.length == 0 ||
        req.body.person.passwordConfirm == undefined || req.body.person.passwordConfirm.length == 0)
        res.status(403).send({ message: 'error' });
    else if (req.body.person.password != req.body.person.passwordConfirm)
        res.status(403).send({ message: 'error' });
    else {
        apiFunction.register(req.body.person.usernameRegister, req.body.person.email, req.body.person.password, function (err) {
            if (err)
                res.status(403).send({ message: 'error' });
            else
                res.status(200).send({ message: 'success' });
        });
    }
});

module.exports = router;