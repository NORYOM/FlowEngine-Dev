# FlowEngine


**FlowEngine** is a visualization development kit for developing HTML5 & Javascript based visualizable projcets.


## Find more in the [Wiki](https://github.com/NORYOM/FE-Dev/wiki)


## Download FlowEngine

Download compressed file directly:
[FlowEngine FlowEngine-mini.js file (zip)](https://github.com/NORYOM/FE-Dev/blob/master/release/FlowEngine-mini.js.zip)

Download source files from:
[FlowEngine source](https://github.com/NORYOM/FE-Dev/blob/master/src)

## Quick Start

### The very first
Following code can be found in [example/example-1-quickStart.html](https://github.com/NORYOM/FE-Dev/blob/master/example/example-1-quickStart.html)

1. Include the FlowEngine-mini.js fisrt.

```html
<script src="./{your folder}/FlowEngine-mini.js"></script>
```

2. And you need a canvas to rend the amazing graphics which FlowEngine generated.

```html

<body bgcolor="#777777">
	<canvas id="canvas1" style="cursor:default;
		position: absolute;
		top: 0;
		left: 0;">
	    The browser does not support HTML5
	</canvas>
</body>

```

3. Rend the canvas when browser window loaded.

```html

<script>
    window.onload = function(){
        // create render object and rend start rend
        var render = new Render("canvas1",800,600);
        render.rend();

        // button
        var btn = new ButtonRec();
        btn.setText("test");
        btn.onClick=function(){
            console.log("clicked");
        };

        // label for output
        var labelOut = new Label();
        labelOut.text = "out";

        // label for input
        var labelIn = new Label();
        labelIn.text = "in";

        // panel
        var pnl = new PanelRec();
        pnl.setTitle("FlowEngine Panel");
        pnl.setTitleColor("#222222");
        pnl.x = 100;
        pnl.y = 200;

        // add items into panel
        pnl.addItem(pnl.paramInOut.IN,labelIn);
        pnl.addItem(pnl.paramInOut.OUT,labelOut);
        pnl.addItem(pnl.paramInOut.NON,btn);

        // rend panel on canvas
        render.addElement(pnl);
    }
</script>

```


## API

### ButtonRec
new ButtonRec(); will create a button rounded edge

```
getText()                   return string shown on button
setText(txt)                set string shown on button, txt : string shown on button
setDisable(flag)            set button disable or not, flag : true/false
isDisabled()                return true: button disabled; false: button enabled
onClick()                   function for define what to do when button clicked
```

### Label
new Label(); will create a label

```
text                        set/get string value
color                       set/get string color
getWidth()                  return width of label
getHeight()                 return height of label

```

### Selector
new Selector(); will create a selector with options

```
setDisable(flag)            set selector disable or not, flag : true/false
getWidth()                  return width of selector
getHeight()                 return height of selector
setOption(opt)              set options, structure is an array should like 
                                [{
                                    value: Object,
                                    display: "displaying string"
                                }];
addOption (optVal,optDis)   add single option into options array, optVal: value of the option; optDis: string for displaying
clearOption()               clear all options
setDefaultOption(n)         set default selected item, n: index of options(start from 0)
getValue()                  return current selected option's value
setEvtName(name)            set event name for detect changing
```

### DigiNum
new DigiNum(); will create a digital number

```
setNum(n)                   set the number which want to shown
```

### Panel(PanelRec/PanelCyc)
```
new PanelRec(); will create a rectangle panel
new PanelCyc(); will create a panel with rounded rectangle
```

```
paramInOut                  indicate the item added into panel is for input or output
                            paramInOut.NON : not for input neither for output
                            paramInOut.IN  : input, will show an input point and the item align left
                            paramInOut.OUT : output, will show an output point and the item align right
setTitle(txt)               set panel title, txt : string for showing title
getTitle()                  return panel title
setTitleColor(color)        set pnel title background color, color : value of color like "#222222"
getInParam(index)           return input point object, index : the index of input parameters(start from 0)
getOutParam(index)          return output point object, index : the index of output parameters(start from 0)
doSomethingInLoop()         function for define what to do during rend the panel
addItem(inout,item)         add items onto panel for showing, inout : paramInOut.NON/IN/OUT; item : the item like label, button, selector and digital number
removeItem(item)            remove item from panel
```

### Render
new Render(canvasId,width,height);  will create a render to rend canvas for drawing items, also drive the flow with special processing
```
canvasId : the id of element <canvas>
width,height : size of canvas for rending
```

```
addElement(obj)             add item into canvas, currently only support Panel(PanelRec/PanelCyc)
removeElement(obj)          remove item(Panel) from canvas
rend()                      rend the canvas
```
