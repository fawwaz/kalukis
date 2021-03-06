define(function(require){

  var fabric = require("fabric"),
      RectOutline = require("outlineShapes/rectOutline");

  describeComponent("services/outlineManager", function(){

    beforeEach(function(){
      setupComponent();
    });

    describe("Constructing the component", function(){

      it("Should setup the canvas", function(){
        setupComponent();
        $('.component-root').trigger("canvas-ready", {
          id: "lukis",
          canvas: "canvas"
        });

        expect(this.component.attr.canvasId).toEqual("lukis");
        expect(this.component.attr.canvas).toEqual("canvas");
      });

    });

    describe("OutlineShape cache", function(){

      beforeEach(function(){
        this.component.attr.canvas = new fabric.Canvas();
        this.component.attr.outlineShapes = {};
      });

      it("Should save a brush to the cache once it has been created", function(){
        $(".component-root").on("activeOutlineShapeUpdated", function(){
          console.log("yoo");
          expect(Object.keys(this.component.attr.outlineShapes).length).toEqual(1);
          expect(this.component.attr.outlineShapes).toHaveOwnProperties("circleOutline");
        }.bind(this));

        $(".component-root").trigger("paintWidget-clicked", {
          paintWidgetId: "circle"
        });
      });

    });

    describe("Managing outlineShape properties", function(){

      beforeEach(function(){
        this.component.attr.canvas = new fabric.Canvas();
      });

      it("Should have updated outlineShapes properties on brushProperty-updated", function(){
        $('.component-root').trigger("brushProperty-updated", {
          key: "width",
          oldValue: 10,
          newValue: 20
        });

        expect(this.component.attr.prop.width).toEqual(20);
      });

      it("Should have publish outlineShapeProperty-updated when the property has been updated", function(){
        this.component.attr.prop.width = 5;
        var spiedEvent = spyOnEvent('.component-root', "outlineShapeProperty-updated");
        $('.component-root').trigger("brushProperty-updated", {
          key: "width",
          newValue: 40
        });

        var data = spiedEvent.mostRecentCall.data;
        expect(data.key).toEqual("width");
        expect(data.oldValue).toEqual(5);
        expect(data.newValue).toEqual(40);
      });

    });

    describe("OutlineShape Request Event", function(){

      var async = new AsyncSpec(this);

      beforeEach(function(){
        this.component.attr.canvas = new fabric.Canvas();
        this.component.attr.prop.width = 20;
        this.component.attr.prop.fillColor = "red";
        this.component.attr.prop.strokeColor = "yellow";
      });

      async.it("Should respond to request event", function(done){

        $(".component-root").on("outlineShape-served", function(e, data){
          expect(data.outlineShape).toBeInstanceOf(RectOutline);
          done();
        });

        $(".component-root").trigger("request-outlineShape", {
          id: "rect"
        });

      });

      async.it("Should set the published outlineShape with the outlineShape properties", function(done){
        $(".component-root").on("outlineShape-served", function(e, data){
          var outlineShape = data.outlineShape;
          expect(outlineShape.get("fillColor")).toEqual("red");
          expect(outlineShape.get("strokeColor")).toEqual("yellow");
          expect(outlineShape.get("width")).toEqual(20);
          done();
        });

        $(".component-root").trigger("request-outlineShape", {
          id: "rect"
        });
      });

    });

  });

});