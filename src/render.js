var __cvs__;
var __cvsRect__;
var __ctx__;
function Render(canvasId,width,height){
    var cleanBgW = width;
    var cleanBgH = height;

    var fps = 60;

	__cvs__ = document.getElementById(canvasId);
	__cvs__.width = width;
	__cvs__.height = height;
	if(!__cvs__ || !__cvs__.getContext){
		alert("not support canvas");
		return;
	}
	if(!__ctx__){
        __ctx__ = __cvs__.getContext("2d");
	}

	var objArr = [];
    var bezierArr = [];
    var bojLayer = 0;// global layer counter
    var requestAniFrame = (function(){
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function( callback ){
                setInterval(callback, 1000 / fps);
            };
    })();

    // refresh canvas bounding, incase scroll page
    __cvsRect__ = __cvs__.getBoundingClientRect();

    window.onresize = function(){
        __cvsRect__ = __cvs__.getBoundingClientRect();
    };
    window.onscroll = function(){
        __cvsRect__ = __cvs__.getBoundingClientRect();
    };

    this.addElement = function(obj){
        if(obj.constructor.name.substring(0,5)!="Panel"){
            console.log("Currently not support adding items directly in canvas, please add item in Panel.");
            return;
        }
        objArr.push(obj);
        obj.layer = bojLayer++;
        obj.ctx = __ctx__;
    };
    function removeElement(obj){
        for(var i=0;i<objArr.length;i++){
            if(obj && obj.id==objArr[i].id){
                objArr.splice(i,1);
                break;
            }
        }
        var inPts = obj.getParamIns();
        var outPts = obj.getParamOuts();
        // in
        for(var j=0;j<inPts.length;j++){
            if(inPts[j]){
                bezierTemp = inPts[j].getLink();
                if(bezierTemp){
                    inPts[j].setLink(null);
                    inPts[j].value = null;
                    (bezierTemp.getStartObj()).removeLink();
                    bezierTemp.setStartObj(null);
                    bezierTemp.setEndObj(null);
                    removeBezierFromList(bezierTemp);
                    bezierTemp = null;
                    break;
                }
            }
        }
        // out
        for(var j=0;j<outPts.length;j++){
            if(outPts[j]){
                for(var i=0;i<bezierArr.length;i++){
                    if(outPts[j]==bezierArr[i].getStartObj()){
                        bezierTemp = bezierArr[i];
                        if(bezierTemp){
                            (bezierTemp.getStartObj()).removeLink();
                            (bezierTemp.getStartObj()).value = null;
                            (bezierTemp.getEndObj()).setLink(null);
                            (bezierTemp.getEndObj()).value = null;
                            bezierTemp.setStartObj(null);
                            bezierTemp.setEndObj(null);
                            removeBezierFromList(bezierTemp);
                            bezierTemp = null;
                            i--;
                        }
                    }
                }
            }
        }
        obj = null;
    };
    this.setFPS = function(inputFPS){
        fps = inputFPS;
    };
    this.getCTX = function(){
        return __ctx__;
    };

    function reOrder(){
        var tempPriority;
        for(var i=0;i<objArr.length;i++){
            for(var j=i;j<objArr.length-1;j++){
                if(objArr[i].layer>objArr[j+1].layer){
                    tempPriority = objArr[i];
                    objArr[i] = objArr[j+1];
                    objArr[j+1] = tempPriority;
                }
            }
        }
    }

    var bezierTemp;
    this.rend = function(){
        var canDrag = false;
        
        // mouse events
        __cvs__.onmousedown = function(e){
            canDrag = true;
            var n = -1;// operate obj
            for(var i=objArr.length-1;i>=0;i--){
                if(objArr[i].isInArea(e)){
                    n = i;
                    break;
                }
                var inPtTem = objArr[i].getParamIns();
                for(var j=0;j<inPtTem.length;j++){
                    if(inPtTem[j] && inPtTem[j].isInArea(e)){
                        n = i;
                        break;
                    }
                }
                if(n!=-1){
                    break;
                }
                var outPtTem = objArr[i].getParamOuts();
                for(var j=0;j<outPtTem.length;j++){
                    if(outPtTem[j] && outPtTem[j].isInArea(e)){
                        n = i;
                        break;
                    }
                }
            }
            if(n!=-1){
                objArr[n].onMouseDown(e);
                var items = objArr[n].getItems();
                var inPts = objArr[n].getParamIns();
                var outPts = objArr[n].getParamOuts();
                for(var j=0;j<items.length;j++){
                    if(outPts[j] && outPts[j].isInArea(e)){
                        outPts[j].onMouseDown(e);
                        bezierTemp = new Bezier();
                        outPts[j].addLink();
                        bezierTemp.setStartObj(outPts[j]);
                        bezierTemp.startBezier(true);
                        bezierTemp.onMouseDown(e);
                    }
                    if(inPts[j] && inPts[j].isInArea(e)){
                        inPts[j].onMouseDown(e);
                        bezierTemp = inPts[j].getLink();
                        if(bezierTemp){
                            inPts[j].setLink(null);
                            bezierTemp.getEndObj().value = null;// sync value with output
                            bezierTemp.setEndObj(null);
                            removeBezierFromList(bezierTemp);
                        }
                    }
                    if(items[j].constructor.name.substring(0,8)!="Selector"){
                        items[j].onMouseDown(e);
                    }
                }
            }
            for(var i=objArr.length-1;i>=0;i--){
                objArr[i].passEvent(e);// pass event when mouse out of area and some event must process
            }
            reOrder();
        };
        __cvs__.onmouseup = function(e){
            for(var i=0;i<objArr.length;i++){
                objArr[i].onMouseUp(e);

                if(objArr[i].constructor.name.substring(0,5)=="Panel"){
                    var items = objArr[i].getItems();
                    var inPts = objArr[i].getParamIns();
                    var outPts = objArr[i].getParamOuts();
                    for(var j=0;j<items.length;j++){
                        if(outPts[j]){
                            outPts[j].onMouseUp(e);
                        }
                        if(inPts[j]){
                            inPts[j].onMouseUp(e);
                            inPts[j].holdForLink();
                            if(inPts[j].isInArea(e)){
                                if(bezierTemp){
                                    if(!inPts[j].getLink()){
                                        bezierTemp.setEndObj(inPts[j]);
                                        inPts[j].setLink(bezierTemp);
                                    }else{
                                        console.log("already occupied!");
                                    }
                                }
                            }
                        }
                        items[j].onMouseUp(e);
                    }
                }
            }
            canDrag = false;

            // process the bezierTemp
            if(bezierTemp){
                if(!bezierTemp.getEndObj()){
                    // if bezier has no end point, remove start point
                    (bezierTemp.getStartObj()).removeLink();
                    bezierTemp.setStartObj(null);
                    bezierTemp = null;
                }else{
                    var existed = false;
                    for(var i=0;i<bezierArr.length;i++){
                        if(bezierTemp==bezierArr[i]){
                            existed = true;
                            bezierTemp = null;
                            break;
                        }
                    }
                    if(!existed){
                        bezierArr.push(bezierTemp);
                        bezierTemp = null;
                    }
                }
            }
        };
        __cvs__.onmousemove = function(e){
            for(var i=objArr.length-1;i>=0;i--){
                objArr[i].onMouseMove(e);

                if(objArr[i].constructor.name.substring(0,5)=="Panel"){
                    var items = objArr[i].getItems();
                    var inPts = objArr[i].getParamIns();
                    var outPts = objArr[i].getParamOuts();
                    for(var j=0;j<items.length;j++){
                        if(outPts[j]){
                            outPts[j].onMouseMove(e);
                            // drag
                            if(canDrag){
                                outPts[j].onMouseDrag(e);
                            }
                        }
                        if(inPts[j]){
                            inPts[j].onMouseMove(e);
                            // drag
                            if(canDrag){
                                inPts[j].onMouseDrag(e);
                            }
                        }
                        items[j].onMouseMove(e);
                        // drag
                        if(canDrag){
                            items[j].onMouseDrag(e);
                        }
                    }
                }

                // drag
                if(canDrag){
                    objArr[i].onMouseDrag(e);
                }
            }
            // bezier
            if(bezierTemp){// the bezier may not push into array, before that shold show it
                bezierTemp.onMouseDrag(e);
            }
        };

        //draw bg
        drawGrid(__cvs__);

        // loop
        requestAniFrame(rendCavas);
    };

    function removeBezierFromList(bezier){
        for(var i=0;i<bezierArr.length;i++){
            if(bezier && bezier==bezierArr[i]){
                var endObj = bezierArr[i].getEndObj();// sync value with output
                if(endObj){
                    endObj.value = null;
                }
                // delete bezier from list
                bezierArr.splice(i,1);
                break;
            }
        }
    }
    function clear(){
        __ctx__.clearRect(0,0,cleanBgW,cleanBgH);
        __ctx__.fillStyle = "rgba(125,125,125,0)";
        __ctx__.fillRect(0,0,cleanBgW,cleanBgH);
    }
    function rendCavas(){
        clear();

        for(var i=0;i<bezierArr.length;i++){
            bezierArr[i].rend();
            // sync value with output
            var startObj = bezierArr[i].getStartObj();
            var endObj = bezierArr[i].getEndObj();
            if(startObj && endObj){
                endObj.value = startObj.value;
            }
        }
        if(bezierTemp){// the bezier may not push into array, before that shold show it
            bezierTemp.rend();
            // sync value with output
            var startObj = bezierTemp.getStartObj();
            var endObj = bezierTemp.getEndObj();
            if(startObj && endObj){
                endObj.value = startObj.value;
            }
        }

        for(var i=0;i<objArr.length;i++){
            objArr[i].rend();
            if(objArr[i].isRemoved()){
                removeElement(objArr[i]);
            }
        }

        // loop use requestAnimationFrame instead of setInterval
        requestAniFrame(rendCavas);
    }
}