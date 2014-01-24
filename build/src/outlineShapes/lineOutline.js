define(["require","./asOutlineShape"],function(t){function i(t,i){this.initialize(t,i)}var e=t("./asOutlineShape");return i.prototype.getSlope=function(t,i){return(i.y-t.y)/(i.x-t.x)},i.prototype.getLineEquation=function(t,i){var e=this.getSlope(t,i);return function(i){return t.y+e*(i-t.x)}},i.prototype.getOutlinePoints=function(t){for(var i=[],e=Math.abs(this.outline.x1-this.outline.x2),n=this.getLineEquation({x:this.outline.x1,y:this.outline.y1},{x:this.outline.x2,y:this.outline.y2}),o=this.outline.x1>this.outline.x2?-1:1,s=o*t,r=0,u=this.outline.x1;e>=r;r+=t,u+=s)i.push({x:u,y:n(u)});return i[0].type="Line",i[0].outline=this.outline,i},i.prototype.onMouseDown=function(t){var i=this.canvas.getPointer(t.e);return this.outline={x1:i.x,y1:i.y,x2:i.x+1,y2:i.y+1},this.isDrawing=!0,this},i.prototype.onMouseMove=function(t){if(this.isDrawing){var i=this.canvas.getPointer(t.e);this.outline.x2=i.x,this.outline.y2=i.y,this.renderOutline()}return this},i.prototype.renderOutline=function(){var t=this.canvas.contextTop;return this.canvas.clearContext(t),t.save(),t.lineWidth=1,t.strokeStyle=this.cfg.strokeColor,t.beginPath(),t.moveTo(this.outline.x1,this.outline.y1),t.lineTo(this.outline.x2,this.outline.y2),t.stroke(),t.restore(),this},e.call(i.prototype),i});