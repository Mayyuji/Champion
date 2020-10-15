define(['jquery', "jquery-cookie"], function ($) {


    function register() {

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
                    if(JSON.parse(result).code){
                        var str=`<span>X</span>${JSON.parse(result).msg}&nbsp;;&nbsp;&nbsp;
                  返回码:${JSON.parse(result).code}
                   `
                   $(".alert-danger").html(str).css({'display':'block'});
                   }else{
                       $(window).attr('location','login.html');
                   }
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
                    if(JSON.parse(result).code){
                         var str=`<span>X</span>${JSON.parse(result).msg}&nbsp;;&nbsp;&nbsp;
                   返回码:${JSON.parse(result).code}
                    `
                    $(".alert-danger").html(str).css({'display':'block'});
                    }else{
                        //用户登录获得名字
                        $.cookie("users",null);
                        $.cookie("users", $("#username").val(), {
                        expires: 7
                        })
                        $(window).attr('location','index.html');
                    }
                   
                },
                error: function (e) {
                    console.log(e);
                    
                }

            })
           
        })
    }
    function clearInput(){
        var dis=$(".alert-danger").css('display')
         if(dis='block'){
            $("input").focus(function(){
                $(".alert-danger").css({
                    'display':'none'
                });
                // $("input").val('');
            })
         }
    }
    return {
        register: register,
        Login: Login,
        clearInput:clearInput,
    }
});