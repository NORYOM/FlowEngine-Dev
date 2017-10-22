function DigiNum(){
    Object.call(this);
    this.x = 0;
    this.y = 0;
    recLen = 10;
    triH = 2;
    triW = 2;
    this.colorBorder = "#444444";
    this.colorOff = "#888888";
    this.colorOn = "#ff9966";

    var num;

    this.setNum = function(n){
        num = n;
    }
    this.test = function(){
        num = 'test';
    }
    this.shut = function(){
        num = null;
    }
    this.getWidth = function(){
        return triW*4+recLen;
    };
    this.getHeight = function(){
        return triH*6+recLen*2;
    };

    this.drawHorizon = function(x,y,c){
        x = x + triW;// make x to the original position
        y = y + triW;// make y to the original position
        __ctx__.save();
        __ctx__.beginPath();

        __ctx__.moveTo(x, y);
        __ctx__.lineTo(x+triH, y-triW);
        __ctx__.lineTo(x+triH+recLen, y-triW);
        __ctx__.lineTo(x+triH+recLen+triW, y);
        __ctx__.lineTo(x+triH+recLen, y+triW);
        __ctx__.lineTo(x+triH, y+triW);
        __ctx__.lineTo(x, y);

        __ctx__.strokeStyle=this.colorBorder;
        __ctx__.lineWidth=1;
        __ctx__.stroke();
        __ctx__.fillStyle=c;
        __ctx__.fill();

        __ctx__.closePath();
        __ctx__.restore();
    };

    this.drawVertical = function(x,y,c){
        x = x + triW;// make x to the original position
        y = y + triH;// make y to the original position
        __ctx__.save();
        __ctx__.beginPath();

        __ctx__.moveTo(x, y);
        __ctx__.lineTo(x-triW, y+triH);
        __ctx__.lineTo(x-triW, y+triH+recLen);
        __ctx__.lineTo(x, y+triH+recLen+triH);
        __ctx__.lineTo(x+triW, y+triH+recLen);
        __ctx__.lineTo(x+triW, y+triH);
        __ctx__.lineTo(x, y);

        __ctx__.strokeStyle=this.colorBorder;
        __ctx__.lineWidth=1;
        __ctx__.stroke();
        __ctx__.fillStyle=c;
        __ctx__.fill();

        __ctx__.closePath();
        __ctx__.restore();
    };

//    -a
//  b|  |d
//    _c
//  e|  |g
//    -f
    this.drawOff = function(){
        this.drawHorizon(this.x, this.y, this.colorOff);//a
        this.drawVertical(this.x, this.y, this.colorOff);//b
        this.drawHorizon(this.x, this.y+triH*2+recLen, this.colorOff);//c
        this.drawVertical(this.x+triH*2+recLen, this.y, this.colorOff);//d
        this.drawVertical(this.x, this.y+triH*2+recLen, this.colorOff);//e
        this.drawHorizon(this.x, this.y+triH*4+recLen*2, this.colorOff);//f
        this.drawVertical(this.x+triH*2+recLen, this.y+triH*2+recLen, this.colorOff);//g
    };
    this.drawOn = function(){
        this.drawHorizon(this.x, this.y, this.colorOn);//a
        this.drawVertical(this.x, this.y, this.colorOn);//b
        this.drawHorizon(this.x, this.y+triH*2+recLen, this.colorOn);//c
        this.drawVertical(this.x+triH*2+recLen, this.y, this.colorOn);//d
        this.drawVertical(this.x, this.y+triH*2+recLen, this.colorOn);//e
        this.drawHorizon(this.x, this.y+triH*4+recLen*2, this.colorOn);//f
        this.drawVertical(this.x+triH*2+recLen, this.y+triH*2+recLen, this.colorOn);//g
    };

    this.draw0 = function(){
        this.drawHorizon(this.x, this.y, this.colorOn);//a
        this.drawVertical(this.x, this.y, this.colorOn);//b
        this.drawHorizon(this.x, this.y+triH*2+recLen, this.colorOff);//c
        this.drawVertical(this.x+triH*2+recLen, this.y, this.colorOn);//d
        this.drawVertical(this.x, this.y+triH*2+recLen, this.colorOn);//e
        this.drawHorizon(this.x, this.y+triH*4+recLen*2, this.colorOn);//f
        this.drawVertical(this.x+triH*2+recLen, this.y+triH*2+recLen, this.colorOn);//g
    };
    this.draw1 = function(){
        this.drawHorizon(this.x, this.y, this.colorOff);//a
        this.drawVertical(this.x, this.y, this.colorOff);//b
        this.drawHorizon(this.x, this.y+triH*2+recLen, this.colorOff);//c
        this.drawVertical(this.x+triH*2+recLen, this.y, this.colorOn);//d
        this.drawVertical(this.x, this.y+triH*2+recLen, this.colorOff);//e
        this.drawHorizon(this.x, this.y+triH*4+recLen*2, this.colorOff);//f
        this.drawVertical(this.x+triH*2+recLen, this.y+triH*2+recLen, this.colorOn);//g
    };
    this.draw2 = function(){
        this.drawHorizon(this.x, this.y, this.colorOn);//a
        this.drawVertical(this.x, this.y, this.colorOff);//b
        this.drawHorizon(this.x, this.y+triH*2+recLen, this.colorOn);//c
        this.drawVertical(this.x+triH*2+recLen, this.y, this.colorOn);//d
        this.drawVertical(this.x, this.y+triH*2+recLen, this.colorOn);//e
        this.drawHorizon(this.x, this.y+triH*4+recLen*2, this.colorOn);//f
        this.drawVertical(this.x+triH*2+recLen, this.y+triH*2+recLen, this.colorOff);//g
    };
    this.draw3 = function(){
        this.drawHorizon(this.x, this.y, this.colorOn);//a
        this.drawVertical(this.x, this.y, this.colorOff);//b
        this.drawHorizon(this.x, this.y+triH*2+recLen, this.colorOn);//c
        this.drawVertical(this.x+triH*2+recLen, this.y, this.colorOn);//d
        this.drawVertical(this.x, this.y+triH*2+recLen, this.colorOff);//e
        this.drawHorizon(this.x, this.y+triH*4+recLen*2, this.colorOn);//f
        this.drawVertical(this.x+triH*2+recLen, this.y+triH*2+recLen, this.colorOn);//g
    };
    this.draw4 = function(){
        this.drawHorizon(this.x, this.y, this.colorOff);//a
        this.drawVertical(this.x, this.y, this.colorOn);//b
        this.drawHorizon(this.x, this.y+triH*2+recLen, this.colorOn);//c
        this.drawVertical(this.x+triH*2+recLen, this.y, this.colorOn);//d
        this.drawVertical(this.x, this.y+triH*2+recLen, this.colorOff);//e
        this.drawHorizon(this.x, this.y+triH*4+recLen*2, this.colorOff);//f
        this.drawVertical(this.x+triH*2+recLen, this.y+triH*2+recLen, this.colorOn);//g
    };
    this.draw5 = function(){
        this.drawHorizon(this.x, this.y, this.colorOn);//a
        this.drawVertical(this.x, this.y, this.colorOn);//b
        this.drawHorizon(this.x, this.y+triH*2+recLen, this.colorOn);//c
        this.drawVertical(this.x+triH*2+recLen, this.y, this.colorOff);//d
        this.drawVertical(this.x, this.y+triH*2+recLen, this.colorOff);//e
        this.drawHorizon(this.x, this.y+triH*4+recLen*2, this.colorOn);//f
        this.drawVertical(this.x+triH*2+recLen, this.y+triH*2+recLen, this.colorOn);//g
    };
    this.draw6 = function(){
        this.drawHorizon(this.x, this.y, this.colorOn);//a
        this.drawVertical(this.x, this.y, this.colorOn);//b
        this.drawHorizon(this.x, this.y+triH*2+recLen, this.colorOn);//c
        this.drawVertical(this.x+triH*2+recLen, this.y, this.colorOff);//d
        this.drawVertical(this.x, this.y+triH*2+recLen, this.colorOn);//e
        this.drawHorizon(this.x, this.y+triH*4+recLen*2, this.colorOn);//f
        this.drawVertical(this.x+triH*2+recLen, this.y+triH*2+recLen, this.colorOn);//g
    };
    this.draw7 = function(){
        this.drawHorizon(this.x, this.y, this.colorOn);//a
        this.drawVertical(this.x, this.y, this.colorOff);//b
        this.drawHorizon(this.x, this.y+triH*2+recLen, this.colorOff);//c
        this.drawVertical(this.x+triH*2+recLen, this.y, this.colorOn);//d
        this.drawVertical(this.x, this.y+triH*2+recLen, this.colorOff);//e
        this.drawHorizon(this.x, this.y+triH*4+recLen*2, this.colorOff);//f
        this.drawVertical(this.x+triH*2+recLen, this.y+triH*2+recLen, this.colorOn);//g
    };
    this.draw8 = function(){
        this.drawOn();
    };
    this.draw9 = function(){
        this.drawHorizon(this.x, this.y, this.colorOn);//a
        this.drawVertical(this.x, this.y, this.colorOn);//b
        this.drawHorizon(this.x, this.y+triH*2+recLen, this.colorOn);//c
        this.drawVertical(this.x+triH*2+recLen, this.y, this.colorOn);//d
        this.drawVertical(this.x, this.y+triH*2+recLen, this.colorOff);//e
        this.drawHorizon(this.x, this.y+triH*4+recLen*2, this.colorOn);//f
        this.drawVertical(this.x+triH*2+recLen, this.y+triH*2+recLen, this.colorOn);//g
    };

    this.rend = function(){
        if(num==null){
            this.drawOff();
        }else if(num=='test'){
            this.drawOn();
        }else{
            switch(num){
                case 0:this.draw0();break;
                case 1:this.draw1();break;
                case 2:this.draw2();break;
                case 3:this.draw3();break;
                case 4:this.draw4();break;
                case 5:this.draw5();break;
                case 6:this.draw6();break;
                case 7:this.draw7();break;
                case 8:this.draw8();break;
                case 9:this.draw9();break;
            }
        }
    };
}

