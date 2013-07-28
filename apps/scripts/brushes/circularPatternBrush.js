define(function(require){
  var fabric = require("fabric"),
      rectOutlinePts = require("utils/rectOutlinePoints"),
      circleOutlinePts = require("utils/circleOutlinePoints"),
      lineOutlinePts = require("utils/lineOutlinePoints");

  return {
    create: function(canvas){
      return new fabric.PatternBrush(canvas);
    },
    // create outline for the specified shape
    createOutline: function(brush, shape, cfg){
      // TODO can we simplify this?
      // TODO parameter checking
      if (shape === "rect") {
        return rectOutlinePts(brush, cfg.x, cfg.y, cfg.width, cfg.height);
      } else if (shape === "circle") {
        return circleOutlinePts(brush, cfg.x, cfg.y, cfg.radius);
      } else if (shape === "line") {
        return lineOutlinePts(brush, cfg.x1, cfg.y1, cfg.x2, cfg.y2);
      }

      return;
    },
    createShapeBrush: function(canvas, cfg) {
      var b = this.create(canvas);
      b.width = cfg.brushWidth || 10;

      var outline = this.createOutline(b, cfg.shape, cfg);

      for (var i = outline.length - 1; i >= 0; i--) {
        b._points.push(new fabric.Point(outline[i].x, outline[i].y));
      }

      b._finalizeAndAddPath();
    }
  };
});