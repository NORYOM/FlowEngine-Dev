function ButtonRec(){
    Button.call(this);
    this.w = 0;
    this.h = 8;

    var buttonR = 5;
    var hideBorder = false;

    this.showBorder = function(flag){
        hideBorder = !flag;
    };

    this.getWidth = function(){
        var realLength = 0;
        for (var i = 0; i < this.getText().length; i++)
        {
            var charCode = this.getText().charCodeAt(i);
            if (charCode >= 0 && charCode <= 128){
                realLength += 1;
            }else{
                realLength += 2;
            }
        }
        this.w = realLength*6;
        return this.w + buttonR*2;
    };
    this.getHeight = function(){
        return this.h + buttonR*2;
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

    this.rend = function(){
        var btnColor = this.isMouseDown()?this.colorMouseDown:(this.isMouseOver()?this.colorOn:this.colorOff);
        this.x = this.x + buttonR;// make x to the original position
        this.y = this.y + buttonR;// make y to the original position
        __ctx__.save();

        __ctx__.beginPath();

        __ctx__.arc(this.x, this.y, buttonR, (Math.PI/180)*180, -1*(Math.PI/180)*90, false);//TL
        __ctx__.lineTo(this.x+this.w,this.y-buttonR);//T
        __ctx__.arc(this.x+this.w, this.y, buttonR, -1*(Math.PI/180)*90, (Math.PI/180)*0, false);//TR
        __ctx__.lineTo(this.x+this.w+buttonR,this.y+this.h);//R
        __ctx__.arc(this.x+this.w, this.y+this.h, buttonR, (Math.PI/180)*0, (Math.PI/180)*90, false);//RB
        __ctx__.lineTo(this.x,this.y+this.h+buttonR);//B
        __ctx__.arc(this.x, this.y+this.h, buttonR, (Math.PI/180)*90, (Math.PI/180)*180, false);//LB
        __ctx__.lineTo(this.x-buttonR,this.y);//L

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
        __ctx__.fillText(this.getText(),this.x,this.y+buttonR*3/2);
        __ctx__.closePath();

        __ctx__.restore();
    };
}

