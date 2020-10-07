require.config({
    paths: {
        "jquery": "jquery-1.10.1.min",
        "jquery-cookie": "jquery.cookie",
        "login": "login"
    },
    shim: {
        //设置依赖关系  先引入jquery.js  然后在隐去jquery-cookie
        "jquery-cookie": ["jquery"],
        //声明当前模块不遵从AMD
        "parabola": {
            exports: "_"
        }
    }
})

require(["login"], function (login) {
    login.loginSend();
    login.Login();
})

console.log("加载成功");