function Panel(){
    Object.call(this);

    var closed = false;
    var title;
    var titleColor;
    var titleH = 20;
    var inPt = [];
    var outPt = [];
    var items = [];
    var mouseDownTitle = false;
    var mouseDownPanel = false;

    var oldLayer = 0;

    this.paramInOut = {
        NON: 0,
        IN: 1,
        OUT: 2
    };

    var btnClose = new ButtonCyc();
    btnClose.setText("x");
    btnClose.onClick=function(){
        closed = true;
    };

    this.setTitle = function(txt){
        title = txt;
        var realLength = 0;
        for (var i = 0; i < txt.length; i++)
        {
            var charCode = txt.charCodeAt(i);
            if (charCode >= 0 && charCode <= 128){
            	realLength += 1;
            }else{
            	realLength += 2;
            }
        }
        realLength = realLength*6;
        this.w = realLength>=this.w-20?realLength+20:this.w;//20 is point radius*4, for distance
    };
    this.getTitle= function(){
        return title;
    };
    this.setTitleColor = function(color){
        titleColor = color;
    };
    this.getTitleColor = function(){
        return titleColor;
    };
    this.setTitleH = function(th){
        titleH = th;
    };
    this.getTitleH = function(){
        return titleH;
    };
    this.isMouseDownTitile = function(){
        return mouseDownTitle;
    };
    this.isRemoved = function(){
        return closed;
    };
    this.getParamIns = function(){
        return inPt;
    };
    this.getParamOuts = function(){
        return outPt;
    };
    this.getInParam = function(index){
        var idx = 0;
        for(var i=0;i<inPt.length;i++){
            if(inPt[i]){
                if(idx==index){
                    return inPt[i];
                }
                idx++;
            }
        }
        return null;
    };
    this.getOutParam = function(index){
        var idx = 0;
        for(var i=0;i<outPt.length;i++){
            if(outPt[i]){
                if(idx==index){
                    return outPt[i];
                }
                idx++;
            }
        }
        return null;
    };
    this.getItems = function(){
        return items;
    };
    this.doSomethingInLoop = function(){};

    var dx,dy;
    this.onMouseDown = function(e){
        if(this.isInTitle(e)){
            mouseDownTitle = true;
            dx = e.clientX - this.x;
            dy = e.clientY - this.y;
        }
        if(this.isInPanel(e)){
            mouseDownPanel = true;
        }
        //for showing order
        oldLayer = this.layer;
        this.layer = 1000;
        btnClose.onMouseDown(e);
    };
    this.onMouseUp = function(e){
        mouseDownTitle = false;
        mouseDownPanel = false;
        this.layer = oldLayer;
        oldLayer = 0;
        btnClose.onMouseUp(e);
    };
    this.onMouseMove = function(e){
        if(mouseDownTitle){
            this.x = (e.clientX - dx);
            this.y = (e.clientY - dy);
        }
        btnClose.onMouseMove(e);
    };
    this.passEvent = function(e){
        for(var i=0;i<items.length;i++){
            if(items[i].constructor.name.substring(0,8)=="Selector"){
                if(e.type=='mousedown'){
                    items[i].onMouseDown(e);
                }else if(e.type=='mousemove'){
                    items[i].onMouseMove(e);
                }
            }
        }
    }

    this.addItem = function(inout,item){
        if(inout==this.paramInOut.IN){
            inPt.push(new PointIn());
            outPt.push(null);
        }else if(inout==this.paramInOut.OUT){
            inPt.push(null);
            outPt.push(new PointOut());
        }else{
            inPt.push(null);
            outPt.push(null);
        }
        items.push(item);
        var panelH = 5;// point radius, init for distance
        for(var i=0;i<items.length;i++){
            panelH += items[i].getHeight() + 2;// styleWidth*2, init for distance
        }
        this.w = item.getWidth()>=this.w-20?item.getWidth()+20:this.w;//20 is point radius*4, for distance
        this.h = this.getTitleH() + panelH;
    };
    this.removeItem = function(item){};

    this.isInTitle = function(e){
        var mx = e.clientX;
        var my = e.clientY;
        var cx = mx-__cvsRect__.left*(__cvs__.width/__cvsRect__.width);
        var cy = my-__cvsRect__.top*(__cvs__.height/__cvsRect__.height);
        if(cx>this.x && cx<(this.x+this.w)
        && cy>this.y && cy<(this.y+this.getTitleH())){
            return true;
        }
        return false;
    };
    this.isInPanel = function(e){
        var mx = e.clientX;
        var my = e.clientY;
        var cx = mx-__cvsRect__.left*(__cvs__.width/__cvsRect__.width);
        var cy = my-__cvsRect__.top*(__cvs__.height/__cvsRect__.height);
        if(cx>this.x && cx<(this.x+this.w)
        && cy>this.y+this.getTitleH() && cy<(this.y+this.getTitleH()+this.h)){
            return true;
        }
        return false;
    };
    this.isInArea = function(e){
        var mx = e.clientX;
        var my = e.clientY;
        var cx = mx-__cvsRect__.left*(__cvs__.width/__cvsRect__.width);
        var cy = my-__cvsRect__.top*(__cvs__.height/__cvsRect__.height);
        if(cx>this.x && cx<(this.x+this.w)
        && cy>this.y && cy<(this.y+this.getTitleH()+this.h)){
            return true;
        }
        return false;
    };
    this.rendCloseButton = function(offset){
        // close button
        btnClose.x = this.x+this.w-btnClose.getWidth()-offset;
        btnClose.y = this.y+this.getTitleH()/2;
        btnClose.rend();
    };
    this.rendItems = function(){
        // draw items and in/out param
        var items = this.getItems();
        var inPts = this.getParamIns();
        var outPts = this.getParamOuts();
        var itemH = 5;// point radius, init for distance
        for(var i=0;i<items.length;i++){
            if(inPts[i]){
                items[i].x = this.x + inPts[i].r*2;
                items[i].y = this.y + this.getTitleH() + itemH + inPts[i].r;
                inPts[i].x = this.x;
                inPts[i].y = items[i].y + items[i].getHeight()/2 - inPts[i].r/2 + 2;// 2 is styleWidth*2(a cycle has 2 border)
                inPts[i].rend();
            }
            if(outPts[i]){
                items[i].x = this.x + this.w - items[i].getWidth() - outPts[i].r*2;
                items[i].y = this.y + this.getTitleH() + itemH + outPts[i].r;
                outPts[i].x = this.x + this.w;
                outPts[i].y = items[i].y + items[i].getHeight()/2 - outPts[i].r/2 + 2;// 2 is styleWidth*2(a cycle has 2 border)
                outPts[i].rend();
            }
            if(!inPts[i] && !outPts[i]){
                items[i].x = this.x + this.w/2 - items[i].getWidth()/2;
                items[i].y = this.y + this.getTitleH() + itemH + 5;// 5 is point radius, for distance
            }
            itemH += items[i].getHeight()+5;// 5 is point radius, for distance
            items[i].rend();
        }
        this.doSomethingInLoop();// do something in loop
    };
}

