function PanelCyc(){
    Panel.call(this);
    this.w = 100;
    this.h = 150;
    this.r = this.getTitleH();

    this.rend = function(){
        __ctx__.save();

        __ctx__.strokeStyle = "#000000";
        __ctx__.lineWidth = 1;

        // draw title
        __ctx__.beginPath();
        __ctx__.fillStyle=this.getTitleColor();
        __ctx__.arc(this.x+this.r, this.y+this.r, this.r, (Math.PI/180)*180, -1*(Math.PI/180)*90, false);//TL
        __ctx__.lineTo(this.x+this.w-this.r,this.y);//T
        __ctx__.arc(this.x+this.w-this.r, this.y+this.r, this.r, -1*(Math.PI/180)*90, (Math.PI/180)*0, false);//TR
        __ctx__.lineTo(this.x,this.y+this.r);//C
        __ctx__.stroke();
        __ctx__.fill();

        // draw tile text
        __ctx__.fillStyle = '#eeeebb';
        __ctx__.fillText(this.getTitle(),this.x+4+this.r/4,this.y+this.getTitleH()/2+4);
        __ctx__.closePath();

        // draw panel
        __ctx__.beginPath();
        __ctx__.fillStyle = '#eeee99';
        __ctx__.moveTo(this.x+this.w,this.y+this.getTitleH());
        __ctx__.lineTo(this.x+this.w,this.y+this.h);//R
        __ctx__.arc(this.x+this.w-this.r, this.y+this.h, this.r, (Math.PI/180)*0, (Math.PI/180)*90, false);//RB
        __ctx__.lineTo(this.x+this.r,this.y+this.h+this.r);//B
        __ctx__.arc(this.x+this.r, this.y+this.h, this.r, (Math.PI/180)*90, (Math.PI/180)*180, false);//LB
        __ctx__.lineTo(this.x,this.y+this.r);//L
        __ctx__.stroke();
        __ctx__.fill();
        __ctx__.closePath();

        __ctx__.restore();

        // close button
        this.rendCloseButton(this.r/4);

        // draw items
        this.rendItems();
    };
}

