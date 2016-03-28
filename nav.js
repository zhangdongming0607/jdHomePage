/**
 * 这里是导航相关的js
 */
(function(){
    var oUl=document.getElementById("right");
    var oLis=oUl.getElementsByTagName("li");
    for(var i=0;i<oLis.length;i++){
        (function(i){
            var curLi=oLis[i];
            var curNav=curLi.getElementsByTagName("div")[0];
            curLi.onmouseover=function(){
                curNav.style.display="block";
                curLi.className="over";
            }
            curLi.onmouseout=function(){
                curNav.style.display="none";
                curLi.className="";
            }
        })(i);
    }
})();