var calcRectApp = function(){

  // Variables
  var outputCanvas;


  var colors = [
    "#FF0040",
    "#8000FF",
    "#0040FF",
    "#01DFD7",
    "#80FF00",
    "#FFBF00",
    "#FF8000",
    "#DF0101",
  ];

  //functions
  var calculateRectangles = function(){
    var rectangles = [];

    var repeatAmount = parseInt(document.getElementById("repeat-amount").value);
    for(j=0; j<repeatAmount; j++){
      for(i=0; i<6; i++){
        var width = parseInt(document.getElementById("rectangle-w-"+(i+1)).value);
        var height = parseInt(document.getElementById("rectangle-h-"+(i+1)).value);
        if(width > 0 && height > 0)
          rectangles.push(new Rectangle(width, height));
      }
    }
    rectangles.sort(Rectangle.prototype.compareFunction);

    var currentColorIndex = 0;
    for(i=0; i<rectangles.length; i++){
      if(i==0){
        rectangles[i].color = colors[currentColorIndex]
        currentColorIndex++;
      } else if(rectangles[i].w == rectangles[i-1].w && rectangles[i].h == rectangles[i-1].h){
        rectangles[i].color = rectangles[i-1].color;
      } else {
        rectangles[i].color = colors[currentColorIndex];
        currentColorIndex++;
      }
    }

    // var packer = new GrowingPacker();
    var packer = new Packer(48, 24);
    packer.fit(rectangles);

    var outputCanvas = document.getElementById("output-canvas");
    var outputContext = outputCanvas.getContext("2d");
    outputContext.canvas.width = parseInt(window.getComputedStyle(document.getElementById('canvas-col')).width);
    outputContext.canvas.height = 500;
    var sizeMod = 4;

    var containerHeight = null;
    var containerWidth = null;

    //clear canvas
    outputContext.clearRect(0, 0, outputCanvas.width, outputCanvas.height);

    for(var n = 0 ; n < rectangles.length ; n++) {
      var block = rectangles[n];
      if (block.fit) {

        //draw
        outputContext.beginPath();
        outputContext.fillStyle = block.color;
        outputContext.rect(
          block.fit.x * sizeMod + 1,
          block.fit.y * sizeMod + 1,
          block.w * sizeMod,
          block.h * sizeMod);
        outputContext.fill()
        outputContext.stroke();
        outputContext.closePath();

        
        //check
        if(containerHeight == null || (block.fit.y + block.h) > containerHeight)
          containerHeight = block.fit.y + block.h;

        if(containerWidth == null || (block.fit.x + block.w) > containerWidth)
          containerWidth = block.fit.x + block.w;
      }
    }

    //update results
    document.getElementById('width-result').innerHTML = ""+containerWidth;
    document.getElementById('height-result').innerHTML = ""+containerHeight;
  }


  // Classes (sort of)

  var Rectangle = function(width, height){
    return {
      w: width,
      h: height,
      color: ''
    };
  };

  Rectangle.prototype = {
    compareFunction: function(first, second){
      //sort by height, equal height checks width
      if(first.h != second.h)
       return first.h - second.h;
      else
       return first.w - second.w;

    }
  };

  //init
  document.addEventListener("DOMContentLoaded", function(event) { 
    document.getElementById("calculate").onclick = calculateRectangles;
  });

}

calcRectApp();


