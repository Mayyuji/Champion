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
            <div id="${data[i].id}" class="sc_btn">加入购物车<span class="iconfont icon-gouwuche"></span></div>
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

    return {
        ceiling: ceiling,
        search:search,
        banner:banner,
        download: download,
    }
});