require.config({
    paths:{
        "jquery": "jquery-1.10.1.min",
        "jquery-cookie": "jquery.cookie",
        "index": "index",
        "prductdetails":"prductdetails",
        "ShoppingCart":"ShoppingCart",
    },
    shim:{
        "jquery-cookie":["jquery"],
        "parabola":{
            exports:"_"
        }
    }
})
require(['index','prductdetails','ShoppingCart'],function(index,prductdetails,ShoppingCart){
    index.ceiling();
    index.search();
    prductdetails.goodsallnum();
    ShoppingCart.loadproduct();
    ShoppingCart.singlenumber();
    ShoppingCart.settlement();
    ShoppingCart.updateData();
})
console.log("加载完成")