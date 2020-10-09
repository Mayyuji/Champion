require.config({
    paths: {
        "jquery": "jquery-1.10.1.min",
        "jquery-cookie": "jquery.cookie",
        "index": "index",
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

require(["index"], function (index) {
    index.ceiling();
    index.search();
    index.banner();
    index.download();
});
console.log("加载.....");