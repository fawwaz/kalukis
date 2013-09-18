define(function(require){

  var fabric = require("fabric"),
      getRandomInt = fabric.util.getRandomInt;

  function HorizontalLineBrush(canvas, cfg){
    this.canvas = canvas;

    cfg = cfg || {};

    cfg.fillColor = cfg.fillColor || "#000000";
    cfg.strokeColor = cfg.strokeColor || "#000000";

    cfg.width = cfg.width || 10;
    cfg.offset = cfg.offset || 0;

    this.cfg = cfg;

    this.initBrush();
  }

  HorizontalLineBrush.prototype.initBrush = function() {
    var hLine = new fabric.PatternBrush(this.canvas);

    hLine.getPatternSrc = function(){
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

    this.brush = hLine;
  };

  HorizontalLineBrush.prototype.getBrush = function() {
    return this.brush;
  };

  HorizontalLineBrush.prototype.set = function(key, value) {
    this.cfg[key] = value;
  };

  HorizontalLineBrush.prototype.get = function(key) {
    return this.cfg[key];
  };

  HorizontalLineBrush.prototype.drawAt = function(point, renderAfter) {
    // nothing
  };

  HorizontalLineBrush.prototype.drawAtPoints = function(points) {
    this.brush._points.length = 0;
    this.brush.width = this.cfg.width;
    this.brush.color = this.cfg.fillColor;
    
    points.forEach(function(p){
      this.brush._points.push(new fabric.Point(p.x, p.y));
    }, this);

    this.brush._finalizeAndAddPath();
  };

  return HorizontalLineBrush;

});