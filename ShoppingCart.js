define(['jquery', "jquery-cookie"], function ($) {
    function loadproduct(){
        let arr=JSON.parse($.cookie("goods"));
        if(!arr||arr.length==0){
            $(".goods").html("<div style='padding:60px;font-weight:bold;font-size:20px'>购物车是空的快去添加吧</div>");
        }else{
        $.ajax({
            url: "../data/goods.json",
            success: function (goodsdata) {
                let data=goodsdata;
                let node='';
                $(".goods").html('');
                for(let i=0;i<arr.length;i++){
                    var msg=data.find(item=>item.id==arr[i].id);
                     node=$(`<div class="panel-body">
                    <div class="minpic">
                    <a href="ProductDetails.html?product_id=${arr[i].id}">
                        <img src="${msg.src}" alt="${msg.title}">
                    </a>  
                    </div>
                    <div class="goodstxt"  id="goodid${arr[i].id}">
                        <p class="goodstxt-title">
                        <a href="ProductDetails.html?product_id=${arr[i].id}">${msg.title} </a>
                            <span class="deleteCurrent">X</span>
                        </p>
                        <div class="price">
                            ￥
                            <span>${msg.price}</span>
                            .00
                        </div>
                        <div class="quantityControl">
                            <div class="fl">
                                <span>数量：</span>
                                <span class="number-l" ></span>
                                <span class="number">${arr[i].num}</span>
                                <span class="number-a" ></span>
                            </div>
                            <div class="fr">
                                ￥
                                <span class="singleummary">${arr[i].num*msg.price}</span>
                            </div>
                        </div>
                    </div>
                </div>
                </div>`);
                    node.appendTo(".goods")
                }   

            },
             
            error: function (e) {
                console.log(e);
            }
        })
    }
}

function singlenumber(){
    if($.cookie("goods")){
        let arr=JSON.parse($.cookie("goods"));
        for(let i=0;i<arr.length;i++){
        $(".goods").on("click","#goodid"+arr[i].id+" .number-l",function(){
            var num=$("#goodid"+arr[i].id+" .number").html()
            
            if(num<=1){
                alert("商品购买数量最少为一件")
                return
            }
            num--;
            $("#goodid"+arr[i].id+" .number").html(Number(num));
//改变cookie内商品数量
            for(let j=0;j<arr.length;j++){
                if(arr[j].id==arr[i].id){
                   
                    arr[i].num=num;
                }
                $.cookie("goods", JSON.stringify(arr), {
                expires: 7
                })
            }
            loadproduct();
            goodsallnum();

        }).on("click","#goodid"+arr[i].id+" .number-a",function(){
            var num=$("#goodid"+arr[i].id+" .number").html()
            num++;
            $("#goodid"+arr[i].id+" .number").html(Number(num));
             for(let j=0;j<arr.length;j++){
                if(arr[j].id==arr[i].id){
                    arr[i].num=num;
                }
                $.cookie("goods", JSON.stringify(arr), {
                expires: 7
                })
               
            }
            loadproduct();
            goodsallnum();
        });
    }
    }
    }
    function  settlement(){
        if($.cookie("goods")){
            let arr=JSON.parse($.cookie("goods"));
            for(let i=0;i<arr.length;i++){
                $(".goods").on("click","#goodid"+arr[i].id+" .deleteCurrent",function(){
                    let str=CTim($("#goodid"+arr[i].id+" .goodstxt-title").text());
                    var bl=confirm("确定删除:   "+str.slice(0,str.length-1)+"   吗?")
                    if(bl){
                         if(arr.length==1){
                            $.cookie("goods",null);
                            console.log($.cookie("goods"))
                        loadproduct(); 
                        }
                        var indexmsg=arr.find(item=>item.id==arr[i].id);
                        var index=arr.indexOf(indexmsg);
                        arr.splice(index,1);

                    $.cookie("goods", JSON.stringify(arr), {
                    expires: 7
                    })
                    loadproduct(); 
                    goodsallnum();
                    }
                   
                })
            }
        }else{
            loadproduct(); 
            goodsallnum();
        }
    }
function coupon() {
    $(".couponpanel-mask").click(function(){
        if($(".couponpanel").height()==18){
            $(".couponpanel").animate({height:'160px'},700);
            $(".number-b ").css({
                transform: 'rotate(0deg)',
                transition: 'all .7s linear',

            })
            
        }else{
            $(".number-b ").css({
                transform: 'rotate(90deg)',
                transition: 'all .7s linear',

            })
            $(".couponpanel").animate({height:'50px'},700);
        }
        
    })
}

function updateData(){
    // 更新数据
    $(".col-sm-7").on("click",".updateData",function(){
        var subtotalprice= Repeatmethod();
        $(".Totalprice").text(subtotalprice);
    })
}
// 重复函数
function Repeatmethod(){
    let str=CTim($(".fr").text());
    let arr=str.substring(1,str.length).split('￥')
    var subtotalprice=0;
    for(let i=0;i<arr.length;i++){
        subtotalprice+=Number(arr[i]);
    }
    return subtotalprice;
}
// 去空格函数
function CTim(str) { 
    return str.replace(/\s/g,''); 
}

function toSettle(){
    $(".container-fluid").on("click","#to-settle",function(){
        var oldprice=Number($(".Totalprice").html());
        var subtotalprice= Repeatmethod();
        $(window).scrollTop(0);
        if(subtotalprice!=oldprice){
            $(".message").text("请先更新购物车")
            $("#alert").css({
                display: 'block'
            })
        }else{
            $(".message").text("￥ -"+oldprice)
            $("#alert").css({
                display: 'block'
            })
            $.cookie("goods",null);
            loadproduct(); 
            goodsallnum();
        }
    })
    $("#alert").click(function(){
        $("#alert").css("display","none")
        $(".Totalprice").html(0)
    })
    $(document).scroll(function() {
        if($("#alert").css("display")=="block"){
            $(window).scrollTop(0);
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
    return {
    loadproduct:loadproduct,
    singlenumber:singlenumber,
    settlement:settlement,
    updateData:updateData,
    coupon:coupon,
    toSettle:toSettle,
    }
})
