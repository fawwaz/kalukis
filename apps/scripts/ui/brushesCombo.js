/**
 * The brush combobox component. It shows the list of brushes available.
 */
define(function(require){
  var defineComponent = require("flight/component"),
      mustache = require("mustache"),
      tmpl = require("text!templates/brushescombo.html");

  return defineComponent(brushesCombo);

  function brushesCombo(){
    var template = "";

    this.defaultAttrs({
      widgetEl: "brush-widget"
    });

    this.after("initialize", function(){
      var me = this;
      // register events handler
      this.on(document, "brushesReady", this.onBrushesReady);
      // this.on(document, "brushSelectionChanged", this.onBrushSelectionChanged);

      // publishing which brush has been clicked
      this.$node.delegate("li", "click", function(){
        me.trigger(document, "brushClicked", {
          brushId: $(this).attr("id")
        });
      });

      this.trigger(document, "brushesRequested");
    });

    this.onBrushesReady = function(e, eObj){
      // this.updateBrushes(e, eObj);
      this.drawBrushesList(eObj);
    };

    this.drawBrushesList = function(eObj){
      var widget = mustache.render(tmpl, eObj.brushes);

      console.log(widget);

      this.$node.append(widget);
      this.$node.children().first().attr("id", this.attr.widgetEl);
    };

    // update our brushes after data changes
    this.updateBrushes = function(e, eObj){
      var widget = this.renderData(eObj.brushes, tmpl);

      // TODO find a better way to update the brushes and the selected
      // brush. The current implementation I think is horrible, because
      // we have to remove the existing widget, then add a new one.
      if (this.$node.children("#"+this.attr.widgetEl).length === 1) {
        this.$node.children("#"+this.attr.widgetEl).remove();
      }

      this.$node.append(widget);
      this.$node.children().first().attr("id", this.attr.widgetEl);
    };
  }
});