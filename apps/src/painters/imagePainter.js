/**
 * I manage the steps taken to paint an image
 */
define(function(require){

  var defineComponent = require("flight/lib/component"),
      withImagePainter = require("painters/withImagePainter"),
      withCanvasEvents = require("painters/withCanvasEvents");

  return defineComponent(imagePainter, withImagePainter, withCanvasEvents);

  function imagePainter(){

    this.defaultAttrs({
      /**
       * The canvas instance
       * @type {Object}
       */
      canvas: undefined

    });

    this.after("initialize", function(){
      this.attachEventListener();
    });

    /**
     * Request canvas
     */
    this.requestCanvas = function(){
      this.trigger("canvasRequested");
    };

    /**
     * Set the canvas
     * @param {Object} canvas The canvas
     */
    this.setCanvas = function(canvas) {
      this.attr.canvas = canvas;
    };

    /**
     * Add event handlers for interesting events
     */
    this.attachEventListener = function(){
      this.on("imageCanvasClicked", function(e, data){
        // ask for other painting activity to stop
        this.trigger("cancelCurrentPainting", {
          active: "image"
        });

        this.initImagePainting(data.files);
      }.bind(this));

      this.on("cancelCurrentPainting", function(e, data){
        if (data !== "image") {
          this.stopCurrentPainting();
        }
      });
    };

    /**
     * Cancel current image painting
     */
    this.stopCurrentPainting = function(){
      // stop image painting
      this.stopImagePainting();
      // unregister canvas events listener
      this.unregisterExistingListeners(this.attr.canvas);
    };

    /**
     * Begins image painting
     * @param  {HTMLFileList} files Images to paint
     */
    this.initImagePainting = function(files){
      this.startImagePainting(this.attr.canvas, files, {
        registerEventListeners: this.registerEventListeners,
        unregisterExistingListeners: this.unregisterExistingListeners
      });
    };

  }

});