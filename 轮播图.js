(function () {
    var oInner = document.getElementById("inner");
    var oOuter = document.getElementById("outer");
    var btnLeft=document.getElementById("btnLeft");
    var btnRight=document.getElementById("btnRight");
    var oTip=document.getElementById("tip");
    var tipList=oTip.getElementsByTagName("li");
    var aryImg = ["img/banner1.jpg", "img/banner2.jpg", "img/banner3.jpg", "img/banner4.jpg",
        "img/banner5.jpg", "img/banner6.jpg"];
    var imgList = oInner.getElementsByTagName("img");
    (function bind() {
        var str = "";
        for (var i = 0; i < aryImg.length; i++) {
            str += "<img src='' trueImg='" + aryImg[i] + "'>";
        }
        oInner.innerHTML = str;
        str = "";
        for(var i=0;i<aryImg.length;i++){
            str+="<li>"+(i+1)+"</li>";
        }
        oTip.innerHTML=str;
        str="";
    })();
    (function lazyLoad() {
        var oInner=document.getElementById("inner")
        for (var i = 0; i < aryImg.length; i++) {
            (function () {
                var curImg = imgList[i];
                var trueImg = new Image;
                trueImg.src = curImg.getAttribute("trueImg");
                trueImg.onload = function () {
                    curImg.src = trueImg.src;
                    oInner.style.backgroundImage="none";
                }
            })();
        }
    })();
    (function mouseMove(){
        oOuter.onmouseenter=function(event){
            event=event||window.event;
            btnLeft.style.display="block";
            btnRight.style.display="block";
            window.clearInterval(oInner.moveTimer);
            event.stopPropagation();
        }
        oOuter.onmouseleave=function(event){
            btnLeft.style.display="none";
            btnRight.style.display="none"
            oInner.moveTimer=window.setInterval(preSwitch,4000);
            event.stopPropagation();
        }
    })();
    oInner.page=-1;
    preSwitch();
    function preSwitch() {
        //window.clearInterval(oInner.moveTimer);
        oInner.page++;
        if(oInner.page===aryImg.length){
            oInner.page=0;
        }
        //console.log(oInner.page+1);
        for(var i=0;i<aryImg.length;i++){
            window.clearInterval(imgList[i].curTimer);
            imgList[i].style.opacity = 0;
            imgList[i].style.filter = "alpha(opacity=0)";
        }
        animate(imgList[oInner.page],{opacity:1},300);
        //oInner.moveTimer = window.setInterval(preSwitch, 4000);
        tipColor();
    }
    oInner.moveTimer = window.setInterval(preSwitch, 4000);
    function backSwitch(){
        //window.clearInterval(oInner.moveTimer);
        oInner.page--;
        if(oInner.page<0){
            oInner.page=aryImg.length-1;
        }
        //console.log(oInner.page+1);
        for(var i=0;i<aryImg.length;i++){
            imgList[i].style.opacity = 0;
            imgList[i].style.filter = "alpha(opacity=0)";
        }
        animate(imgList[oInner.page],{opacity:1},300);
        //oInner.moveTimer = window.setInterval(preSwitch, 4000);
        tipColor();
    }
    function tipColor(){
        for(var i=0;i<imgList.length;i++){
            tipList[i].className=(oInner.page===i)?"select":null;
        }
    }
    btnLeft.onclick=backSwitch;
    btnRight.onclick=preSwitch;
    (function tipover(){
        for(var i=0;i<tipList.length;i++){
            (function(i){
                var curTip=tipList[i];
                curTip.onmouseover=function(){
                    if(i===oInner.page){return;}//防止没切换的的时候也闪
                    oInner.page=i;
                    for(var k=0;k<aryImg.length;k++){
                        imgList[k].style.opacity = 0;
                        imgList[k].style.filter = "alpha(opacity=0)";
                    }
                    animate(imgList[oInner.page],{opacity:1},300,function(){});
                    tipColor();
                }
            })(i);
        }
    })();
})();
