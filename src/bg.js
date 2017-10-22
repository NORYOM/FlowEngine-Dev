var bgCvs;
function drawGrid(mainCvs){
    var gridW = 20;
    if(!bgCvs){
    	bgCvs = document.createElement("canvas");
    }
    bgCvs.style.position = "absolute";
    bgCvs.width = mainCvs.width;
    bgCvs.height = mainCvs.height;
    bgCvs.style.left = mainCvs.style.left;
    bgCvs.style.top = mainCvs.style.top;
    bgCvs.style.zIndex = -100;
    document.body.appendChild(bgCvs);
    var bgCtx = bgCvs.getContext("2d");
	bgCtx.save();
	for(var i=0;i<bgCvs.width/gridW;i++){
		for(var j=0;j<bgCvs.height/gridW;j++){
			bgCtx.fillStyle = "#999999";
			bgCtx.fillRect(i*(gridW+1),j*(gridW+1),gridW,gridW);
		}
	}
	bgCtx.restore();
}