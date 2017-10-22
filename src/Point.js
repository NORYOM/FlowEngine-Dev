function Point(){
    Object.call(this);
    this.r = 5;
    this.text = "";
    this.value = null;

    this.colorOff = "#cccccc";
    this.colorReday = "#77cc77";
    this.colorMouseDown = "#7777cc";
    this.colorOn = "#cccc00";

    this.mouseDrag = false;
    this.mouseDown = false;

    this.readyForLink = false;

    this.holdForLink = function(){
        readyForLink = false;
    };
    this.readyForLink = function(){
        readyForLink = true;
    };

    this.isInArea = function(e){
        var mx = e.clientX;
        var my = e.clientY;
        var cx = mx-__cvsRect__.left*(__cvs__.width/__cvsRect__.width);
        var cy = my-__cvsRect__.top*(__cvs__.height/__cvsRect__.height);
        
        if(cx>this.x-this.r && cx<(this.x+this.r)
        && cy>this.y-this.r && cy<(this.y+this.r)){
            return true;
        }
        return false;
    };

    this.onMouseDown = function(e){
        if(this.isInArea(e)){
            this.mouseDown = true;
        }
    };
    this.onMouseDrag = function(e){
        if(this.isInArea(e)){
            this.mouseDrag = true;
        }else{
            this.mouseDrag = false;
        }
    };
    this.onMouseUp = function(e){
    	this.mouseDown = false;
        if(this.isInArea(e)){
            this.mouseDrag = false;
        }
    };
}

