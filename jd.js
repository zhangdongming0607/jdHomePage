/**
 * Created by zhoulingsong on 2016/3/23.
 */
//dd-search.jd.com/?ver=2&zip=1&key=tml&pvid=16ogx4mi.6wvti3&t=1458751267785&curr_url=www.jd.com%2F&callback=jQuery5983931
//url:"http://dd-search.jd.com/?ver=2&zip=1&key="+val+"&pvid=16ogx4mi.6wvti3&t="+Math.random()+"&curr_url=www.jd.com%2F",
(function(){
//搜索栏相关
        var searchInp = document.querySelector("#logo .search div input");
        var searchList = document.querySelector("#logo .search div div ul");
        var oOuter=document.getElementById("outer");
        searchInp.onfocus = searchInp.onkeyup = function () {
            var val = this.value.replace(/(^ +| +$)/g, "");
            if (val.length > 0) {
                searchList.style.display = "block";
                oOuter.style.zIndex = -1;
                $.ajax({
                    url: "http://suggestion.baidu.com/su?wd=" + val + "&_=" + Math.random(),
                    type: "get",
                    dataType: "jsonp",
                    jsonp: "cb",
                    success: function (data) {
                        if (data) {
                            var ary = data["s"];
                            var str = "";
                            for (var i = 0; i < ary.length; i++) {
                                str += "<li><a href='javascript:;'>" + ary[i] + "</a></li>";
                            }
                            searchList.innerHTML = str;
                        }
                    }
                });
            } else {
                searchList.style.display = "none";
               oOuter.style.zIndex = 0;
            }
        };
    searchList.onclick = function (e) {
            e = e || window.event;
            e.target = e.target || e.srcElement;
            if (e.target.tagName.toLowerCase() === "a") {
                searchList.style.display = "none";
                searchInp.value = e.target.innerHTML;
                return;
            }
            searchList.style.display = "none";
        };

        searchInp.onclick = function (e) {
            e = e || window.event;
            e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
        };
})();
(function(){
    var oCar=document.querySelector("#logo .center .car");
    var oDetail=document.querySelector("#logo .center .car .detail");
    var oBar=document.querySelector("#logo .center .car .bar");
    oCar.addEventListener("mouseover",function(){
        oDetail.style.display="block";
        oBar.style.display="block";
    },false);
    oCar.addEventListener("mouseout",function(){
        oDetail.style.display="none";
        oBar.style.display="none";
    },false);
})();
//右边栏绑定图片
(function(){
    var oPic=document.querySelectorAll("#express .icon ul li div:nth-child(1)");
    [].forEach.call(oPic,function(item,index){
        item.style.backgroundPosition="0,0";
        item.style.backgroundPosition="0 "+(-25)*index+"px";
    });
})();
/**
 * 这里是导航相关的js
 */
(function(){
    var oIcons=document.querySelectorAll("#express .icon ul li")
    var oUl=document.getElementById("right");
    var oLis=oUl.getElementsByTagName("li");
    var oOuter=document.getElementById("outer");
    for(var i=0;i<oLis.length;i++){
        (function(i){
            var curLi=oLis[i];
            var curNav=curLi.getElementsByTagName("div")[0];
            curLi.onmouseover=function(){
                curNav.style.display="block";
                curLi.className="over";
                oOuter.style.zIndex=-1;
                [].forEach.call(oIcons,function(item,index){
                    item.style.zIndex = -1;
                });

            };
            curLi.onmouseout=function(){
                curNav.style.display="none";
                curLi.className="";
                oOuter.style.zIndex=0;
                [].forEach.call(oIcons,function(item,index){
                    item.style.zIndex = 0;
                });
            }
        })(i);
    }

})();

