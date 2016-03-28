(function (){
    function getCss(curEle,attr){
        if(window.getComputedStyle){
            var val=window.getComputedStyle(curEle,null)[attr];
        }else {
            if("opacity"===attr){
                val=curEle.currentStyle["filter"];
                var reg=/^alpha\(opacity=(\d+)(\.\d+)?\)$/;
                val=reg.test(val)?(reg.exec(val)[1])/100:1;
            }
            else {
                val=curEle.currentStyle[attr];
            }
        }
        var tempVal=parseFloat(val);
        return !isNaN(tempVal)?tempVal:val;
    }
    function setCss(curEle,attr,value){
        if("opacity"===attr){
            curEle.style.opacity=value;
            curEle.style.filter="alpha(opacity="+value*100+")";
        }
        else{
            curEle.style[attr]==value+"px";
        }
    }
    function animate(curEle,tarObj,duration,callBack){
        var oChange={},oBegin={},times= 0,interval=15;
        for(var attr in tarObj){
            oBegin[attr]=getCss(curEle,attr);
            oChange[attr]=tarObj[attr]-oBegin[attr];
        }
        window.clearInterval(curEle.curTimer);
        curEle.curTimer=window.setInterval(function(){
            times+=interval;
            if(times<duration){
                for(var attr in tarObj){
                    var curVal=times/duration*oChange[attr]+oBegin[attr];
                    setCss(curEle,attr,curVal);
                }
            }
            else {
                for(var attr in tarObj){
                    setCss(curEle,attr,tarObj[attr]);
                }
                window.clearInterval(curEle.curTimer);
                if(typeof callBack==="function"){
                    callBack.call(curEle);
                }
            }
        },interval);
    }
    window.animate=animate;
    window.setCss=setCss;
})()