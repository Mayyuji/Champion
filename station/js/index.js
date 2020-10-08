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

    function download() {
        $.ajax({
            url: "../data/goods.json",
            succcess: function (data) {
                for (var i = 0; i < data.length; i++) {
                    var node = $(`
                    <li class="goods_item">
                  <div class="goods_pic">
                      <img src="${data[i].src}" alt="">
                  </div>
                  <div class="goods_title">
                      <p>${data[i].title}</p>
                  </div>
                  <div class="sc">
                    <div>${data[i].price}</div>
                      <div id="${data[i].id}" class="sc_btn">加入购物车</div>
                  </div>
                    </li>
                    `).appendTo(".goods");
                }
            },
            error: function (e) {
                console.log(e);
            }
        })
    }

    return {
        ceiling: ceiling,
        download: download,
    }
});