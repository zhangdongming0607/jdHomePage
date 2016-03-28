(function () {
    var oBanner2 = document.querySelector("#recomand .banner");
    var aryImg2=[];
    //ajax
    var $ajax = function (url, callback) {
        var xhr = new XMLHttpRequest;
        url.indexOf("?") > -1 ? url += "&_=" + Math.random() : url += "?_=" + Math.random();
        xhr.open("get", url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
                var con = xhr.responseText;
                con = JSON.parse(con);
                typeof callback === "function" ? callback(con) : null;
            }
        };
        xhr.send(null);
    };
    $ajax("img.json",function(){
        [].forEach.call(arguments[0],function(item,index){
            aryImg2.push(item.url);
        });
        bind();
        inti();
        window.onscroll=inti;
    });
    function bind() {
        var str = "";
        for (var i = 0; i < aryImg2.length; i++) {
            str += "</div><img src='img/loading.gif' trueImg='" + aryImg2[i] + "'>";
        }
        oBanner2.innerHTML = str;
        str = "";
    };
    function inti() {
        var imgList=document.querySelectorAll("#recomand .banner img");
        for (var i = 0; i < imgList.length; i++) {
            ~function (i) {
                var curImg = imgList[i];
                if (curImg.isLoad) return;
                var curImgTop = utils.offset(curImg).top + curImg.offsetHeight, navigatorTop = utils.win("clientHeight") + utils.win("scrollTop");
                if (curImgTop <= navigatorTop) {
                    var oImg = new Image;
                    oImg.src = curImg.getAttribute("trueImg");
                    oImg.onload = function () {
                        curImg.src = this.src;
                        curImg.isLoad = true;
                    }
                }
            }(i);
        }
    }
//    回到顶部
    (function(){
        var oTop=document.getElementById("backTop");
        oTop.onclick=function(){
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        }
    })()
})();
