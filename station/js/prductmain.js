require.config({
    paths:{
        "jquery": "jquery-1.10.1.min",
        "jquery-cookie": "jquery.cookie",
        "index": "index",
        "prductdetails":"prductdetails"
    },
    shim:{
        "jquery-cookie":["jquery"],
        "parabola":{
            exports:"_"
        }
    }
})
require(['index','prductdetails'],function(index,prductdetails){
    index.ceiling();
    index.search();
    prductdetails.obtain();
    prductdetails.magnifier();
})
console.log("加载完成")