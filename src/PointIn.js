function PointIn(){
    Point.call(this);

    var colorOccupied = "#cc7777";
    var link;

    this.setLink = function(obj){
        link = obj;
    };
    this.getLink = function(){
        return link;
    };

    this.rend = function(){
        var ptColor = this.mouseDrag?(link?colorOccupied:(this.readyForLink?this.colorReday:this.colorOff)):(link?this.colorOn:this.colorOff);

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

