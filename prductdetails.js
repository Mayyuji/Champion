define(['jquery', "jquery-cookie"], function ($) {
function obtain(){
    var product_id=getid(location.search,"product_id");
    $.ajax({
        url: "../data/goods.json",
        success: function (data) {
           var msg=data.find(item=>item.id==product_id);
            var node=(`<section class="site">
            <a href="index.html">商店</a>
            <span>/</span>
            <a href="jacaScript:;">男装</a>
            <span>/</span>
            <em class="goods-name">${msg.title}</em>
        </section>
        <section class="details">
            <div class="magnifier">
            <img src="${msg.src}" alt="${msg.title}">
            </div>
            <div class="left-pic">
            <img src="${msg.src}"
                    alt="${msg.title}">
                    <div class="mask"></div>
            </div>
            <div class="right-txt">
                <p class="title">${msg.title}</p>
                <b>￥<span class="price">${msg.price}</span></b>

                <div class="origin">
                    <p>材料 : 100% 棉</p>
                    <p>产地 : 中国</p>
                </div>
                <div class="panel panel-default">
                    <div class="form-group panel-body">
                        <div class="col-sm-3">尺寸</div>
                        <div class="col-sm-9 ">
                            <button class="btn pull-right">XXL</button>
                            <button class="btn pull-right">XL</button>
                            <button class="btn pull-right">S</button>
                            <button class="btn pull-right">M</button>
                            <button class="btn pull-right">L</button>
                        </div>
                    </div>
                </div>
                <div class="panel panel-default">
                    <div class="form-group panel-body">
                        <div class="col-sm-4">数量</div>
                        <div class="col-sm-8">
                            <div class="pull-right">
                                <span class="number-l"></span>
                                <span class="number">1</span>
                                <span class="number-a"></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="panel panel-default">
                    <div class="form-group panel-body btn btn-car" id="${msg.id}">加入购物车</div>
                </div>
                <div class="panel panel-default share">
                    <a href="javaScript:;" class="iconfont icon-Facebook"></a>
                    <a href="javaScript:;" class="iconfont icon-instagram"></a>
                    <a href="javaScript:;" class="iconfont icon-Twitter"></a>
                </div>
            </div>
        </section>`);
        $(".main-c").append(node);
        },
         
        error: function (e) {
            console.log(e);
        }
    })
}
function getid(search,goodsid){
    var start=search.indexOf(goodsid+'=');
    if(start==-1){
        return null;
    }else{
        var end=search.indexOf("&",start);
        if(end==-1){
            end=search.length;
        }
        var str=search.substring(start,end);
        var arr=str.split("=");
        return arr[1];
    }
}
function magnifier(){
    $(".main-c").on("mouseover",".left-pic",function(){
        $(".left-pic .mask,.magnifier").css({
            'display':'block',
        })
    });
    $(".main-c").on("mousemove",".left-pic",function(e){
            var l=parseInt( e.pageX-$(this).offset().left-75);
            var y=parseInt(e.pageY-$(this).offset().top-75);
            l = Math.max(0, l);
            l = Math.min(343, l); 
            y = Math.max(0, y);
            y = Math.min(343, y); 
            $(".left-pic .mask").css({
                'top':y,
                'left':l
            });
            $(".magnifier img").css({
                'top':-2*y,
                'left':-2*l
            });
    });
    $(".main-c").on("mouseleave",".left-pic",function(){
        $(".left-pic .mask,.magnifier").css({
            'display':'none',
        })
    });

}

    // 获取数量 
    $(".main-c").on("click",".pull-right .number-l",function(){
        var num=$(".pull-right .number").html()
        
        if(num<=1){
            alert("商品购买数量最小为一件")
            return
        }
        num--;
        $(".pull-right .number").html(num);
    }).on("click",".pull-right .number-a",function(){
        var num=$(".pull-right .number").html()
        num++;
        $(".pull-right .number").html(num);
    });
    // 添加购物车操作
    $(".main-c").on("click", ".btn-car", function(){
        var id = $(this).id;
        var first = $.cookie("goods") == null ? true : false;

        //如果是第一次添加
        if(first){
            //直接创建cookie
            var cookieStr = `[{"id":${id},"num":${$(".pull-right .number").html()}}]`;
            $.cookie("goods", cookieStr, {
                expires: 7
            })
        }else{
            var same = false; //假设没有添加过
            //3、如果不是第一次添加，判断之前是否添加过
            var cookieStr = $.cookie("goods");
            var cookieArr = JSON.parse(cookieStr);
            for(var i = 0; i < cookieArr.length; i++){
                if(cookieArr[i].id == id){
                    //如果之前添加过，数量+1
                    cookieArr[i].num++;
                    same = true;
                    break;
                }
            }

            if(!same){
                //如果没有添加过，新增商品数据
                var obj = {id:id, num:$(".pull-right .number").html()};
                cookieArr.push(obj);
            }

            //最后，存回cookie中
            $.cookie("goods", JSON.stringify(cookieArr), {
                expires: 7
            })
        }

        alert($.cookie("goods"));
    })



return{
    obtain:obtain,
    magnifier:magnifier,
}
})