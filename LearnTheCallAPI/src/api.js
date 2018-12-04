var express = require('express');
var router = express.Router();
var apiFunction = require('./apiFunction');
var colors = require('colors');
var dateFormat = require('dateformat');
var passport = require('passport')

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    var now = new Date();
    //    console.log(req);
    console.log(colors.bold.green('[%s] : connexion to %s'), dateFormat(now, "yyyy-mm-dd, HH:MM:ss"), req.originalUrl);
    next();
});

router.post('/login', function (req, res) {
    console.log(req.body);
    if (req.body.usernameLogin == undefined || req.body.usernameLogin.length == 0 ||
        req.body.password == undefined || req.body.password.length == 0)
        res.status(403).send({ message: 'error' });
    else {
        apiFunction.login(req.body.usernameLogin, req.body.password, function (err, Bearer) {
            if (err)
                res.status(403).send({ message: 'error' });
            else
                res.status(200).send({ data: Bearer });
        });
    }
});

router.post('/register', function (req, res) {
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

router.post('/updatePassword', function (req, res) {
    if (req.body.password == undefined || req.body.password.length == 0 ||
        req.body.passwordConfirm == undefined || req.body.passwordConfirm.length == 0)
        res.status(403).send({ message: 'Password or password confirm are empty' });
    if (req.body.password != req.body.passwordConfirm)
        res.status(403).send({ message: 'Passwords are not the same' });
    else {
        apiFunction.updatePassword(req.body.password, req.body.passwordConfirm, function (err) {
            if (err)
                res.status(200).send({ message: err });
            else
                res.status(200).send({ message: 'SUCCESS' });
        });
    }
})

router.post('/addImage', /*passport.authenticate('jwt', { session: false }),*/ function (req, res) {
    if (req.body.image.name == undefined || req.body.image.name.length == 0 ||
        req.body.image.responseOne == undefined || req.body.image.responseOne.length == 0 ||
        req.body.image.responseTwo == undefined || req.body.image.responseTwo.length == 0 ||
        req.body.image.responseThree == undefined || req.body.image.responseThree.length == 0 ||
        req.body.image.responseFour == undefined || req.body.image.responseFour.length == 0 ||
        req.body.image.goodAnswer == undefined || req.body.image.goodAnswer.length == 0)
        res.status(403).send({ message: "error" });
    else {
        apiFunction.addImage(req.body.image, function (err) {
            if (err)
                res.status(403).send({ message: err });
            else
                res.status(200).send({ message: "SUCCESS" });
        });
    }
});

router.post('/updateImage', function (req, res) {
    apiFunction.updateImage(req.body.image, function (err, result) {
        if (err)
            res.status(403).send({ message: err })
        else
            res.status(200).send({ message: result })
    })
})

router.post('/deleteImage', function (req, res) {
    apiFunction.deleteImage(req.body.idImage, function (err) {
        if (err)
            res.status(403).send({ message: err });
        else
            res.status(200).send({ message: "SUCCES Image Deleted !" });
    });
});

router.get('/getAllImage', passport.authenticate('jwt', { session: false }), function (req, res) {
    apiFunction.getAllImage(function (err, result) {
        if (err)
            res.status(403).send({ message: "Error" });
        else
            res.status(200).send({ message: result });
    });
});

router.get('/allUsers', passport.authenticate('jwt', { session: false }), function (req, res) {
    apiFunction.getAllUsers(function (err, users) {
        if (err)
            res.status(403).send({ message: "error" });
        else
            res.status(200).send({ message: users });
    });
});

router.get('/getImageInFolder', passport.authenticate('jwt', { session: false }), function (req, res) {
    apiFunction.getImageInFolder(function (err, result) {
        if (err)
            res.status(403).send({ message: "ERROR" });
        else
            res.status(200).send({ message: result });
    });
});

router.post('/getThisImage', function (req, res) {
    apiFunction.getThisImage(req.body.body, function (err, result) {
        if (err)
            res.status(403).send({ message: err });
        else
            res.status(200).send({ message: result });
    });
});

router.post('/')

module.exports = router;
