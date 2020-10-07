define(['jquery', "jquery-cookie"], function ($) {
    function loginSend() {
        $("#register").click(function () {
            $.ajax({
                type: "post",
                url: "./php/register.php",
                data: {
                    username: $("#username").val(),
                    password: $("#password").val(),
                    rpassword: $("#rpassword").val(),
                },
                success: function (result) {
                    console.log(result);
                },
                error: function (e) {
                    console.log(e);
                }

            })
        })
    }

    function Login() {
        $("#login").click(function () {
            $.ajax({
                type: "post",
                url: "./php/login.php",
                data: {
                    username: $("#username").val(),
                    password: $("#password").val()
                },
                success: function (result) {
                    console.log(result);
                },
                error: function (e) {
                    console.log(e);
                }

            })
        })
    }
    return {
        loginSend: loginSend,
        Login: Login,
    }
});