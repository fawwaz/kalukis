/**
 * TODO this module should not manage canvas events. As it's only concern is
 * on the events in which painting with shape brush is initiated and any
 * events which has relation with brush's properties.
 */
define(function(require){

  var defineComponent = require("flight/component"),
      withCanvas = require("data/with_canvas"),
      withPaintShape = require("ui/with_paint_shape"),
      fabric = require("fabric"),
      outlinePainter = require("outlinePainter/rect");

  return defineComponent(shapeBrush, withCanvas, withPaintShape);

  function shapeBrush(){

    this.getOutlinePainter = function(){
      return outlinePainter.init(this.attr.canvas, {
        color: this.attr.brush.color
      });
    };

    this.afterFinishCallback = function(){
      this.trigger(document, "paintStopRequested");

      this.attr.rect = this.attr.outlinePainter.outline;
      // draw painting
      this.createShapeBrush();
    };

    this.setHandlers = function(){
      this.on(document, "selectedBrushReady", this.onSelectedBrushReady);
    };

    this.releaseHandlers = function(){
      this.off(document, "releaseHandlersRequested");
    };

    this.createShapeBrush = function(){
      var brushModule = "shapeBrush/rect-"+this.attr.brushId,
          me = this,
          rect = me.attr.rect;

      // TODO what should happen when the brush cannot be loaded?
      require([brushModule], function(brush){

        brush.create(me.attr.canvas, {
          x: (rect.width > 0) ? rect.x : rect.x + rect.width,
          y: (rect.height > 0) ? rect.y : rect.y + rect.height,
          width: Math.abs(rect.width),
          height: Math.abs(rect.height),
          color: me.attr.brush.color
        });

        me.attr.canvas.renderAll();
      });

      me.attr.rect = null;
    };
  }
});