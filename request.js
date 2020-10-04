//对外暴露方法1
// export default $jsonp;
// function $jsonp({
function jsonp({
    url,
    params,
    callback
}) {
    var funcName = "callbackFunction" + Date.now() + Math.random().toString().substring(2); //确保函数的唯一性
    if (params) {
        url += "?" + queryString(params) + "&callback=" + funcName;
    }
    window[funcName] = function (data) {
        console.log(data);
        callback(data);
        delete window[funcName];
        //全部从页面上删除
        document.body.removeChild(oScript);
    };
    //动态创建script标签
    var oScript = document.createElement("script");
    oScript.src = url;
    document.body.appendChild(oScript);
}
//遍历对象获得传入数据并拼接
function queryString(obj) {
    if (!obj) return "";
    var str = ``;
    for (var attr in obj) {
        str += `${attr}=${obj[attr]}&`;
    }
    return str.substring(0, str.length - 1);
}
export const $jsonp = jsonp; //对外暴露方法二