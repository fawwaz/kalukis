define(["require"],function(){function e(){var e;this.after("initialize",function(){this.on("activeOutlineShape-changed",function(e,t){this.requestOutlineShapeInstance(t.id)}.bind(this)),this.on("brushProperty-updated",function(e,t){this.updateActiveOutlineShapeProperty(t.key,t.newValue)}.bind(this))}),this.requestOutlineShapeInstance=function(e){this.on("outlineShape-served",this.onOutlineShapeServed),this.trigger("request-outlineShape",{id:e})},this.onOutlineShapeServed=function(e,t){this.off("outlineShape-served",this.onOutlineShapeServed),this.setActiveOutlineShapeInstance(t.outlineShape)},this.setActiveOutlineShapeInstance=function(t){e=t,this.trigger("activeOutlineShape-ready",{activeOutlineShape:t})},this.getActiveOutlineShape=function(){return e},this.updateActiveOutlineShapeProperty=function(t,i){e&&e.set(t,i)}}return e});