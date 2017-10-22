function PointOut(){
    Point.call(this);

    var lnkNum = 0;

    this.addLink = function(){
        lnkNum++;
    };
    this.removeLink = function(){
        lnkNum--;
        if(lnkNum<0){
            lnkNum = 0;
        }
    };
    this.isOutStart = function(){
        return this.mouseDown;
    };

    this.rend = function(){
        var ptColor = this.mouseDrag?(this.readyForLink?this.colorMouseDown:this.colorOff):(lnkNum?this.colorOn:this.colorOff);
        ptColor = this.mouseDown?this.colorMouseDown:ptColor;

        __ctx__.save();

        __ctx__.beginPath();
        __ctx__.arc(this.x, this.y, this.r, (Math.PI/180)*0, (Math.PI/180)*360, false);
        __ctx__.strokeStyle="#000000";
        __ctx__.lineWidth=2;
        __ctx__.stroke();
        __ctx__.fillStyle=ptColor;
        __ctx__.fill();
        __ctx__.fillStyle = '#222222';
        __ctx__.fillText(this.text,this.x-this.w,this.y);
        __ctx__.closePath();

        __ctx__.restore();
    };
}

