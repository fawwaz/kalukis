define(["require","fabric","utils/rectOutlinePoints","utils/circleOutlinePoints","utils/lineOutlinePoints"],function(t){var i=t("fabric"),e=t("utils/rectOutlinePoints"),n=t("utils/circleOutlinePoints"),r=t("utils/lineOutlinePoints");return{create:function(t){var e=new i.PatternBrush(t);return e.getPatternSrc=function(){var t=i.document.createElement("canvas");t.width=t.height=10;var e=t.getContext("2d");return e.strokeStyle=this.color,e.lineWidth=5,e.beginPath(),e.moveTo(0,5),e.lineTo(10,5),e.closePath(),e.stroke(),t},e},createOutline:function(t,i,o){return"rect"===i?e(t,o.x,o.y,o.width,o.height):"circle"===i?n(t,o.x,o.y,o.radius):"line"===i?r(t,o.x1,o.y1,o.x2,o.y2):void 0},createShapeBrush:function(t,e){var n=this.create(t);n.width=e.brushWidth||10,n.color=e.color;for(var r=this.createOutline(n,e.shape,e),o=r.length-1;o>=0;o--)n._points.push(new i.Point(r[o].x,r[o].y));n._finalizeAndAddPath()}}});