function ButtonCyc(){
    Button.call(this);
    this.w = 0;
    this.h = 0;

    var buttonR = 5;
    var hideBorder = true;

    this.showBorder = function(flag){
        hideBorder = !flag;
    };

    this.isInArea = function(e){
        var mx = e.clientX;
        var my = e.clientY;
        var cx = mx-__cvsRect__.left*(__cvs__.width/__cvsRect__.width);
        var cy = my-__cvsRect__.top*(__cvs__.height/__cvsRect__.height);
        
        if(cx>this.x-buttonR && cx<(this.x+this.w+buttonR)
        && cy>this.y-buttonR && cy<(this.y+this.h+buttonR)){
            return true;
        }
        return false;
    };
    this.getWidth = function(){
        return buttonR*2;
    };
    this.getHeight = function(){
        return buttonR;
    };

    this.rend = function(){
        var btnColor = this.isMouseDown()?this.colorMouseDown:(this.isMouseOver()?this.colorOn:this.colorOff);

        __ctx__.save();

        __ctx__.beginPath();

        __ctx__.arc(this.x+0.4, this.y+0.4, buttonR, (Math.PI/180)*180, -1*(Math.PI/180)*180, false);
        
        if(!hideBorder){
            __ctx__.strokeStyle="#000000";
            __ctx__.lineWidth=1;
            __ctx__.stroke();
        }
        __ctx__.fillStyle=btnColor;
        if(this.isDisabled()){
            __ctx__.fillStyle = this.colorDisable;
        }
        __ctx__.fill();
        __ctx__.fillStyle = '#222222';
        __ctx__.fillText(this.getText(),this.x-2,this.y+3);

        __ctx__.closePath();
        __ctx__.restore();
    };
}

