define(['jquery', "jquery-cookie"], function ($) {
    
    function ceiling() {
        $(window).on("scroll", function () {
            var x = parseInt($(document).scrollTop());
            if (x > 74) {
                $(".head").css({
                    'position': 'fixed',
                    'top': '0px',
                    'z-index': '3'
                });
                $(".swiper-container").css({
                    'margin-top': "147px"
                })
            } else {
                $(".head").css({
                    'position': '',
                    'top': '',
                    'z-index': ''
                });
                $(".swiper-container").css({
                    'margin-top': ""
                })

            }
        })
    }
    function search(){
        $(".head #search").click(function(){
            $(".container").css({
                'display': 'block',
            })
        });
        $(".head #cancel").click(function(){
            $(".container").css({
                'display': 'none',
            })
        });
        $("#searchgoods").focus(function(){
            $(".search-list").css({
                'display': 'block',
            })
        }).blur(function(){
            $(".search-list").css({
                'display': 'none',
            })
        })

    }

    function banner(){
        var mySwiper = new Swiper('.swiper-container', {
            autoplay: true,
            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
                el: '.swiper-pagination',
            },

            // 如果需要前进后退按钮
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        })
    }
function navlist(){
     function load(k,l){
        $.ajax({
        url: "../data/navlist.json",
        success: function (data) {
            var str = ``;
        for (var i = k; i < l; i++) {
        str += `
        <li><img src="${data[i].src}" alt="${data[i].title}"><span>${data[i].title}</span></li>
        `
        }
        $(".listchoose").html(str);
        },
        error: function (e) {
            console.log(e);
        }
        })
     }
    $("nav").on("mouseenter","li",function(){
        var node=$(this).attr("id");
        if(node=="man"){
         load(0,9);
        }else if(node=="women"){
            load(9,18);
        }else if(node=="children"){
            load(18,22);
        }
    })
      
}
    function download() {
        $.ajax({
            url: "../data/goods.json",
            success: function (data) {
                var str = ``;
        for (var i = 0; i < data.length; i++) {
            str += `
            <li class="goods_item">
          <div class="goods_pic">
          <a href="ProductDetails.html?product_id=${data[i].id}">
              <img src="${data[i].src}" alt="">
        </a>
          </div>
         
          <div class="goods_title">
               <a href="ProductDetails.html?product_id=${data[i].id}"><p>${data[i].title}</p></a>
          </div>
          <div class="sc">
            <div>￥${data[i].price}</div>
            <div id="${data[i].id}" class="sc_btn">
            <a href="ProductDetails.html?product_id=${data[i].id}">
                加入购物车<span class="iconfont icon-gouwuche"></span>
            </a>
            </div>
          </div>
            </li>
            `
        }
        $(".goods-c .goods").html(str);
            },
            error: function (e) {
                console.log(e);
            }
        })
    }
    function goodsallnum(){
        
        let arr=JSON.parse($.cookie("goods"));
        let n=0; 
        if(arr){
            $(".goods-allnum").css({
                'display': 'block'
            })
            for(let j=0;j<arr.length;j++){
            n+=arr[j].num;
        }
            $(".goods-allnum").html(n);
        }else{
            $(".goods-allnum").css({
                'display': 'none'
            })
        }
        if($.cookie("users")){
            $(".icon-xiaoren span").text($.cookie("users").replace(/\"/g,""));
        }
        
        
    }
    function backtotop(){
       $("#backtop").click(function(){
            if( parseInt($(window).scrollTop())!=0){
                $("html").animate({
                    scrollTop:0,
                })
            }
        })
    }
    return {
        ceiling: ceiling,
        search:search,
        banner:banner,
        navlist:navlist,
        download: download,
        goodsallnum:goodsallnum,
        backtotop:backtotop,
    }
});