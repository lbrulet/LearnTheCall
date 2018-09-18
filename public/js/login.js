$(function () {
    $('#login-form-link').click(function (e) {
        $("#login-form").delay(100).fadeIn(100);
        $("#register-form").fadeOut(100);
        $('#register-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });
    $('#register-form-link').click(function (e) {
        $("#register-form").delay(100).fadeIn(100);
        $("#login-form").fadeOut(100);
        $('#login-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });
});

function register() {
    let usernameRegister = $("#username-register").val();
    let email = $("#email").val();
    let password = $("#password-register").val();
    let passwordConfirm = $("#confirm-password-register").val();
    var person = { usernameRegister: usernameRegister, email: email, password: password, passwordConfirm: passwordConfirm };
    $.post("/api/register", { person }, function (data) {
    }).done(function(data) {    
        $(location).attr('href', '/home');
    }).fail(function (data, textStatus, xhr) {
        $(location).attr('href', '/login');
    });
}

function login() {
    let usernameLogin = $("#username-login").val();
    let password = $("#password-login").val();
    var person = { usernameLogin: usernameLogin, password: password };    
    $.post("/api/login", { person }, function (data) {
    }).done(function(data) {
        $(location).attr('href', '/home');
    }).fail(function (data, textStatus, xhr) {
        $(location).attr('href', '/login');
    });
}