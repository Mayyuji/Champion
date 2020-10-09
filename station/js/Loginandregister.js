require.config({
    paths: {
        "jquery": "jquery-1.10.1.min",
        "jquery-cookie": "jquery.cookie",
        "login_register": "login_register"
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

require(["login_register"], function (login_register) {
    login_register.register();
    login_register.Login();
    login_register.clearInput();

})

console.log("加载成功");