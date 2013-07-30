define(["require","fabric","utils/rectOutlinePoints","utils/circleOutlinePoints","utils/lineOutlinePoints","brushes/circleBrushHelper"],function(t){var i=t("fabric"),e=t("utils/rectOutlinePoints"),n=t("utils/circleOutlinePoints"),r=t("utils/lineOutlinePoints"),o=t("brushes/circleBrushHelper"),a=i.util.createClass(i.CircleBrush,{addPoint:function(t){var e=new i.Point(t.x,t.y),n=i.util.getRandomInt(Math.max(0,this.width-20),this.width+20)/2,r=new i.Color(this.color).setAlpha(i.util.getRandomInt(0,100)/100).toRgba();return e.radius=n,e.strokeColor=r,this.points.push(e),e},onMouseMove:function(t){var i=this.addPoint(t),e=this.canvas.contextTop;e.lineWidth=1,e.strokeStyle=i.strokeColor,e.beginPath(),e.arc(i.x,i.y,i.radius,0,2*Math.PI,!1),e.closePath(),e.stroke()},onMouseUp:function(){var t=this.canvas.renderOnAddition;this.canvas.renderOnAddition=!1;for(var e=0,n=this.points.length;n>e;e++){var r=this.points[e],o=new i.Circle({radius:r.radius,left:r.x,top:r.y,fill:null,stroke:r.strokeColor,strokeWidth:1});this.canvas.add(o)}this.canvas.clearContext(this.canvas.contextTop),this.removeShadowStyles(),this.canvas.renderOnAddition=t,this.canvas.renderAll()}});return{create:function(t){return new a(t)},createOutline:function(t,i,o){return"rect"===i?e(t,o.x,o.y,o.width,o.height):"circle"===i?n(t,o.x,o.y,o.radius):"line"===i?r(t,o.x1,o.y1,o.x2,o.y2):void 0},createShapeBrush:function(t,i){var e=this.create(t);e.width=i.brushWidth||10;var n=this.createOutline(e,i.shape,i),r=n.length;e.color=i.color||"#000000";for(var a=0;r>a;a++)e.addPoint(n[a]);o.drawCircles(t,{points:e.points})}}});