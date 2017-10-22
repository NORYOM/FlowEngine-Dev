function Object(){
    this.id = (new Date()).getTime()+Math.random();
    this.x = 0;
    this.y = 0;
    this.w = 0;
    this.h = 0;
    this.layer = 0;

    this.onMouseDown = function(e){};
    this.onMouseUp = function(e){};
    this.onMouseDrag = function(e){};
    this.onMouseOver = function(e){};
    this.onMouseOut = function(e){};
    this.onMouseMove = function(e){};
    this.isInArea = function(e){};
    this.getWidth = function(){};
    this.getHeight = function(){};
    this.rend = function(){};
    this.passEvent = function(e){
    // pass event from top level when mouse out of area and some event must process
    };
    this.isRemoved = function(){};
}