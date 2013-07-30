define(function(require){
  var fabric = require("fabric"),
      compose = require("flight/lib/compose"),
      withOutlineHelper = require("brushes/with_outline_helper");

  var horizontalLineBrush = {
    create: function(canvas){
      var vLine = new fabric.PatternBrush(canvas);

      // override
      vLine.getPatternSrc = function(){
        // create a canvas for the pattern
        var patternCanvas = fabric.document.createElement("canvas");
        patternCanvas.width = patternCanvas.height = 10;

        var ctx = patternCanvas.getContext("2d");
        // create the pattern
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(0, 5);
        ctx.lineTo(10, 5);
        ctx.closePath();
        ctx.stroke();
        // return this canvas pattern
        return patternCanvas;
      };

      return vLine;
    },
    
    createShapeBrush: function(canvas, cfg){
      var b = this.create(canvas);
      b.width = cfg.brushWidth || 10;
      b.color = cfg.color;

      var outline = this.createOutline(b, cfg.shape, cfg);

      for (var i = outline.length - 1; i >= 0; i--) {
        b._points.push(new fabric.Point(outline[i].x, outline[i].y));
      }

      b._finalizeAndAddPath();
    }
  };

  compose.mixin(horizontalLineBrush, [withOutlineHelper]);

  return horizontalLineBrush;
});