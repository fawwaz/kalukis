define(function(require){
  var circleOutline = require("utils/circleOutline"),
      sprayBrush = require("brushes/sprayBrush");

  function createCircularSpray(canvas, cfg){
    var sb = sprayBrush.create(canvas),
        outline = circleOutline(sb, cfg.x, cfg.y, cfg.radius),
        outlineLength = outline.length;

    sb.color = cfg.color || "#000000";

    for (var i = 0; i < outlineLength; i++){
      sb.addSprayChunk(outline[i]);
    }

    sb.onMouseUp();
  }

  return {
    create: function(canvas, cfg){
      if (!cfg.x || !cfg.y || !cfg.radius){
        throw new Error("Required params not provided");
      }

      return createCircularSpray(canvas, cfg);
    }
  };
});