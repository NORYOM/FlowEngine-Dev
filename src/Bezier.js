function Bezier(){
    var startX=0, startY=0;
    var startDraw = false;
    var mx;
    var my;
    var drag = false;
    var showControlPoint = false;
    var softControlPoint = true;
    var canDrawBezier = false;

    var startObj;
    var endObj;

    this.setStart = function(x,y){
        startX = x;
        startY = y;
    };
    this.getStart = function(){
        return {x:startX, y:startY};
    };
    this.setEnd = function(x,y){
        mx = x;
        my = y;
    };
    this.startBezier = function(flag){
        canDrawBezier = flag;
    };
    this.setStartObj = function(obj){
        startObj = obj;
    };
    this.setEndObj = function(obj){
        endObj = obj;
    };
    this.getStartObj = function(){
        return startObj;
    };
    this.getEndObj = function(){
        return endObj;
    };
    this.isDrawing = function(){
    	return drag;
    };
    this.setDrawing = function(flag){
    	drag = flag;
    };
    this.isDrawn = function(){
    	return startDraw;
    };
    this.setDrawn = function(flag){
    	startDraw = flag;
    };

    this.onMouseDown = function(e){
        if(canDrawBezier){
            drag = true;
            
            startX = e.clientX-__cvsRect__.left*(__cvs__.width/__cvsRect__.width);
            startY = e.clientY-__cvsRect__.top*(__cvs__.height/__cvsRect__.height);
        }
    };
    this.onMouseDrag = function(e){
        if(drag){
            startDraw = true;
            mx = e.clientX-__cvsRect__.left*(__cvs__.width/__cvsRect__.width);
            my = e.clientY-__cvsRect__.top*(__cvs__.height/__cvsRect__.height);
        }
    };
    this.onMouseUp = function(e){
        drag = false;
    };
    this.onmousemove = function(e){
    };

    this.rend = function(){
        if(startObj){
            startX = startObj.x;
            startY = startObj.y;
        }
        if(endObj){
            mx = endObj.x;
            my = endObj.y;
        }
        if(startDraw){
            __ctx__.save();
            __ctx__.beginPath();
            __ctx__.moveTo(startX, startY);
            var x1 = startX + (mx-startX)/4;
            var y1 = startY - (my-startY)/4;
            var x2 = mx - (mx-startX)/4;
            var y2 = my + (my-startY)/4;
            if(softControlPoint){
                y1 = startY;
                y2 = my;
            }
            __ctx__.bezierCurveTo(x1,y1,x2,y2,mx,my);
            __ctx__.lineWidth=1;
            __ctx__.strokeStyle = "#222222";
            __ctx__.shadowColor = "RGBA(50,50,50,1)";
            __ctx__.shadowOffsetX = 2;
            __ctx__.shadowOffsetY = 2;
            __ctx__.shadowBlur = 10;
            __ctx__.stroke();
            __ctx__.closePath();
            if(showControlPoint){
                __ctx__.fillStyle = "#ff0000";
                __ctx__.fillRect(x1,y1,3,3);
                __ctx__.fillStyle = "#00ff00";
                __ctx__.fillRect(x2,y2,3,3);
            }
            __ctx__.restore();
        }
    };
}

