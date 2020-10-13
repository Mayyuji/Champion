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
                        <img src="${msg.src}"
                            alt="${msg.title}">
                    </div>
                    <div class="goodstxt"  id="goodid${arr[i].id}">
                        <p class="goodstxt-title">
                        ${msg.title}
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
    // console.log($.cookie("goods"));
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
        });
    }
    }
    }
    function  settlement(){
        if($.cookie("goods")){
            let arr=JSON.parse($.cookie("goods"));
            for(let i=0;i<arr.length;i++){
                $(".goods").on("click","#goodid"+arr[i].id+" .deleteCurrent",function(){
                    var bl=confirm($(".goodstxt-title").text())
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
                    }
                   
                })
            }
        }else{
            loadproduct(); 
        }
    }

function updateData(){
    let subtotalprice;
    $(".col-sm-7").on("click",".updateData",function(){
        let str=CTim($(".fr").text());
        let arr=str.substring(1,str.length).split('￥')
        var subtotalprice=0;
        for(let i=0;i<arr.length;i++){
            subtotalprice+=Number(arr[i]);
        }
        console.log(subtotalprice);
$(".Totalprice").text(subtotalprice);
    })
    console.log(subtotalprice);
}
// 去空格函数
function CTim(str) { 
    return str.replace(/\s/g,''); 
}
    return {
    loadproduct:loadproduct,
    singlenumber:singlenumber,
    settlement:settlement,
    updateData:updateData,
    }
})