define(["require","fabric","utils/rectOutlinePoints","utils/circleOutlinePoints","utils/lineOutlinePoints"],function(i){var t=i("fabric"),e=i("utils/rectOutlinePoints"),n=i("utils/circleOutlinePoints"),r=i("utils/lineOutlinePoints");return{create:function(i){return new t.PatternBrush(i)},createOutline:function(i,t,a){return"rect"===t?e(i,a.x,a.y,a.width,a.height):"circle"===t?n(i,a.x,a.y,a.radius):"line"===t?r(i,a.x1,a.y1,a.x2,a.y2):void 0},createShapeBrush:function(i,e){var n=this.create(i);n.width=e.brushWidth||10,n.color=e.color;for(var r=this.createOutline(n,e.shape,e),a=r.length-1;a>=0;a--)n._points.push(new t.Point(r[a].x,r[a].y));n._finalizeAndAddPath()}}});