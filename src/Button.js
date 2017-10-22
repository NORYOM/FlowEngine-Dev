function Button(){
    Object.call(this);
    this.colorOff = "#cccccc";
    this.colorMouseDown = "#dddddd";
    this.colorOn = "#eeeeee";
    this.colorDisable = "#666666";

    var text = "";

    var mouseOver = false;
    var mouseDown = false;
    var disabled = false;

    this.getText = function(){
        return text;
    };
    this.setText = function(txt){
        text = txt;
        this.getWidth();
    };

    this.isMouseDown = function(){
        return mouseDown;
    };
    this.isMouseOver = function(){
        return mouseOver;
    };
    this.setDisable = function(flag){
        disabled = flag;
    };
    this.isDisabled = function(){
        return disabled;
    };

    this.onMouseDown = function(e){
        if(disabled){
            return;
        }
        if(this.isInArea(e)){
            mouseDown = true;
        }
    };
    this.onMouseUp = function(e){
        if(this.isInArea(e) && mouseDown && mouseOver){
            this.onClick();
        }
        mouseDown = false;
    };
    this.onMouseMove = function(e){
        if(disabled){
            return;
        }
        if(this.isInArea(e)){
            mouseOver = true;
        }else{
            mouseOver = false;
        }
    };
    this.onClick = function(){};
}

