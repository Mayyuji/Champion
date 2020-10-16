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
    index.navlist();
    index.backtotop();
    prductdetails.goodsallnum();
    ShoppingCart.loadproduct();
    ShoppingCart.singlenumber();
    ShoppingCart.settlement();
    ShoppingCart.updateData();
    ShoppingCart.coupon();
    ShoppingCart.toSettle();
})
console.log("加载完成")