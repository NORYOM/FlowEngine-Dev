function PanelRec(){
    Panel.call(this);
    this.w = 100;
    this.h = 150;

    this.rend = function(){
        __ctx__.save();

        __ctx__.strokeStyle = "#000000";
        __ctx__.lineWidth = 1;

        // draw title
        __ctx__.beginPath();
        __ctx__.fillStyle=this.getTitleColor();
        __ctx__.moveTo(this.x, this.y);//TL
        __ctx__.lineTo(this.x+this.w,this.y);//TR
        __ctx__.lineTo(this.x+this.w,this.y+this.getTitleH());//RB
        __ctx__.lineTo(this.x,this.y+this.getTitleH());//LB
        __ctx__.lineTo(this.x,this.y);//End
        __ctx__.stroke();
        __ctx__.fill();

        // draw tile text
        __ctx__.fillStyle = '#eeeebb';
        __ctx__.fillText(this.getTitle(),this.x+4,this.y+this.getTitleH()/2+2);
        __ctx__.closePath();

        // draw panel
        __ctx__.beginPath();
        __ctx__.fillStyle = '#eeee99';
        __ctx__.moveTo(this.x+this.w,this.y+this.getTitleH());//TR
        __ctx__.lineTo(this.x+this.w,this.y+this.getTitleH()+this.h);//RB
        __ctx__.lineTo(this.x,this.y+this.getTitleH()+this.h);//LB
        __ctx__.lineTo(this.x,this.y+this.getTitleH());//End
        __ctx__.stroke();
        __ctx__.fill();
        __ctx__.closePath();

        __ctx__.restore();

        // close button
        this.rendCloseButton(0);

        // draw items
        this.rendItems();
    };
}

