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

    for(i=0; i<6; i++){
      var width = parseInt(document.getElementById("rectangle-w-"+(i+1)).value);
      var height = parseInt(document.getElementById("rectangle-h-"+(i+1)).value);
      rectangles.push(new Rectangle(width, height));
    }
    rectangles.sort(Rectangle.prototype.compareFunction);

    var packer = new GrowingPacker();
    packer.fit(rectangles);

    var outputCanvas = document.getElementById("output-canvas");
    var outputContext = outputCanvas.getContext("2d");
    var sizeMod = 4;

    var containerHeight = null;
    var containerWidth = null;

    for(var n = 0 ; n < rectangles.length ; n++) {
      var block = rectangles[n];
      if (block.fit) {

        //draw
        outputContext.fillStyle = colors[n%colors.length];
        outputContext.fillRect(
          block.fit.x * sizeMod,
          block.fit.y * sizeMod,
          block.w * sizeMod,
          block.h * sizeMod);
        
        //check
        if(containerHeight == null || (block.fit.x + block.h) > containerHeight)
          containerHeight = block.fit.x + block.h;

        if(containerWidth == null || (block.fit.y + block.w) > containerWidth)
          containerWidth = block.fit.y + block.w;
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
      h: height
    };
  };

  Rectangle.prototype = {
    compareFunction: function(first, second){
      return first.h - second.h;
    }
  };

  //init
  document.addEventListener("DOMContentLoaded", function(event) { 
    document.getElementById("calculate").onclick = calculateRectangles;
  });

}

calcRectApp();


