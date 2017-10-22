function Selector(){
    Object.call(this);
    this.colorSelBg = "#727272";
    this.colorSelOn = "#3C3F41";
    this.colorSelDisable = "#666666";

    var w = 50;
    var h = 10;
    var selR = 5;
    var disabled = false;
    var option = [{
        value: 0x101,
        display: "Please select"
    }];
    var selectedItem = 0;// init default
    var showItems = false;
    var selectedH = 10;
    var openedH = 10;
    var highLightX,highLightY,highLightW,highLightH;
    var firstItemCanHighlight = false;
    var oldValue = selectedItem;
    var event;

    this.setPos = function(x,y){
        this.x = x;
        this.y = y;
    };
    this.getWidth = function(){
        return w + selR*3/2;
    };
    this.getHeight = function(){
        return selectedH + selR*2;
    };

    this.setDisable = function(flag){
        disabled = flag;
    };
    this.setOption = function(opt){
        option = opt;
    };
    this.addOption = function(optVal,optDis){
        option.push({value: optVal,display: optDis});
        openedH = selR*3.5*option.length;
        h = selR*3.5*option.length;
        for(var i=0;i<option.length;i++){
            var tmpW = getStrLength(option[i].display);
            if(tmpW>w-selR){
                w = tmpW+selR*2;
            }
        }
    };
    this.clearOption = function(opt){
        option = [];
    };
    this.setDefaultOption = function(n){
        if(n>option.length){
            n = option.length-1;
        }
        if(n<0){
            n = 0;
        }
        selectedItem = n;
    };
    this.getValue = function(){
        return option[selectedItem].value;
    }
    this.setEvtName = function(name){
        event = new CustomEvent(name);
    }

    this.onMouseDown = function(e){
        if(this.isInSelectorArea(e.clientX,e.clientY) && option.length>1){
            showItems = !showItems;
        }
        if(!showItems){
            firstItemCanHighlight = false;
            if(oldValue!=selectedItem){
                oldValue = selectedItem;
                dispatchEvent(event);
            }
        }else{
            oldValue = selectedItem;
        }
    };
    this.onMouseMove = function(e){
        if(!showItems){
            return;
        }
        var tmpY = e.clientY-__cvsRect__.top*(__cvs__.height/__cvsRect__.height);// first item
        if(tmpY>this.y+selR+selectedH){
            firstItemCanHighlight = true;
        }
        if(showItems && firstItemCanHighlight){
            this.highLight(e.clientX,e.clientY);
        }
    };
    this.isInSelectorArea = function(mx,my){
        var cx = mx-__cvsRect__.left*(__cvs__.width/__cvsRect__.width);
        var cy = my-__cvsRect__.top*(__cvs__.height/__cvsRect__.height);
        return (cx>this.x-selR && cx<(this.x+w+selR) && cy>this.y-selR && cy<(this.y+h+selR));
    };
    this.highLight = function(mx,my){
        var cx = mx-__cvsRect__.left*(__cvs__.width/__cvsRect__.width);
        var cy = my-__cvsRect__.top*(__cvs__.height/__cvsRect__.height);
        highLightX = this.x-selR;
        highLightW = w+selR*2;
        highLightH = selR*3.5;
        for(var i=0;i<option.length;i++){
            highLightY = this.y-selR+i*selR*3.5;
            if(cx>highLightX && cx<(highLightX+highLightW) && cy>highLightY && cy<(highLightY+highLightH)){
                selectedItem = i;
            }
        }
    };
    function getStrLength(str){
        var realLength = 0;
        for (var i = 0; i < str.length; i++){
            charCode = str.charCodeAt(i);
            if (charCode >= 0 && charCode <= 128)
            realLength += 1;
            else
            realLength += 2;
        }
        return realLength*6;
    }
    function drawArrow(x,y){
        __ctx__.beginPath();
        __ctx__.strokeStyle="#eeee99";
        __ctx__.moveTo(x+w-selR,y+selR/2);
        __ctx__.lineTo(x+w,y+selR/2);
        __ctx__.lineTo(x+w-selR/2,y+selR*3/2);
        __ctx__.lineTo(x+w-selR,y+selR/2);
        __ctx__.stroke();
        __ctx__.closePath();
    }
    this.rend = function(){
        this.x = this.x + selR;// make x to the original position
        this.y = this.y + selR;// make y to the original position
        __ctx__.save();

        if(!showItems){// show selected item
            h = selectedH;
            this.setDefaultOption(selectedItem);
            __ctx__.beginPath();
            __ctx__.arc(this.x, this.y, selR, (Math.PI/180)*180, -1*(Math.PI/180)*90, false);//TL
            __ctx__.lineTo(this.x+w,this.y-selR);//T
            __ctx__.arc(this.x+w, this.y, selR, -1*(Math.PI/180)*90, (Math.PI/180)*0, false);//TR
            __ctx__.lineTo(this.x+w+selR,this.y+h);//R
            __ctx__.arc(this.x+w, this.y+h, selR, (Math.PI/180)*0, (Math.PI/180)*90, false);//RB
            __ctx__.lineTo(this.x,this.y+h+selR);//B
            __ctx__.arc(this.x, this.y+h, selR, (Math.PI/180)*90, (Math.PI/180)*180, false);//LB
            __ctx__.lineTo(this.x-selR,this.y);//L

            __ctx__.strokeStyle="#000000";
            __ctx__.lineWidth=1;
            __ctx__.stroke();
            __ctx__.fillStyle=this.colorSelOn;
            if(disabled){
                __ctx__.fillStyle = this.colorSelDisable;
            }
            __ctx__.fill();

            // show text
            __ctx__.fillStyle = '#eeee99';
            __ctx__.fillText(option[selectedItem].display,this.x,this.y+selR*3/2);
            __ctx__.closePath();

            // arrow
            drawArrow(this.x,this.y);
        }else{// show all items
            h = openedH;
            __ctx__.beginPath();
            __ctx__.moveTo(this.x-selR, this.y-selR);//O
            __ctx__.lineTo(this.x+w+selR,this.y-selR);//T
            __ctx__.lineTo(this.x+w+selR,this.y+h);//R
            __ctx__.lineTo(this.x-selR,this.y+h);//B
            __ctx__.lineTo(this.x-selR,this.y-selR);//L

            __ctx__.strokeStyle="#000000";
            __ctx__.lineWidth=1;
            __ctx__.stroke();
            __ctx__.fillStyle=this.colorSelBg;
            if(disabled){
                __ctx__.fillStyle = this.colorSelDisable;
            }
            __ctx__.fill();

            // show text
            for(var i=0;i<option.length;i++){
                if(option[selectedItem].value==option[i].value){
                    var ox = this.x-selR;
                    var oy = this.y-selR+i*selR*3.5;
                    highLightX = ox;
                    highLightY = oy;
                    highLightW = w+selR*2;
                    highLightH = selR*3.5;
                    __ctx__.beginPath();
                    __ctx__.fillStyle=this.colorSelOn;
                    __ctx__.moveTo(ox,oy);
                    __ctx__.lineTo(ox+w+selR*2,oy);
                    __ctx__.lineTo(ox+w+selR*2,oy+selR*3.5);
                    __ctx__.lineTo(ox,oy+selR*3.5);
                    __ctx__.lineTo(ox,oy);
                    __ctx__.fill();
                    __ctx__.closePath();
                }
                __ctx__.fillStyle = '#eeee99';
                __ctx__.fillText(option[i].display,this.x,this.y+selR*1.5+i*selR*3.5);
            }
            __ctx__.closePath();

            // arrow
            drawArrow(this.x,this.y);
        }

        __ctx__.restore();
    };
}

