function Label(){
    Object.call(this);
    this.h = 8;// text height
    this.text = "";
    this.color = "#000000";

    this.getWidth = function(){
        var realLength = 0;
        for (var i = 0; i < this.text.length; i++)
        {
            var charCode = this.text.charCodeAt(i);
            if (charCode >= 0 && charCode <= 128){
            	realLength += 1;
            }else{
            	realLength += 2;
            }
        }
        this.w = realLength*6;
        return this.w;
    };
    this.getHeight = function(){
        return this.h;
    };
    this.onMouseMove = function(e){};
	this.rend = function(){
        __ctx__.save();

        __ctx__.fillStyle = this.color;
        __ctx__.fillText(this.text,this.x,this.y+this.h);// text coordinate starts at text's left bottom

        __ctx__.restore();
	};
}