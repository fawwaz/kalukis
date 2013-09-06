require.config({
  baseUrl: "src",

  paths: {
    fabric: "canvas-lib/fabric",
    jquery: "../../vendor/jquery/jquery",
    text: "../../vendor/requirejs-text/text",
    mustache: "../../vendor/mustache/mustache",
    spectrum: "../../vendor/spectrum/spectrum",
    "es5-shim": "../../vendor/es5-shim/es5-shim",
    "es5-sham": "../../vendor/es5-shim/es5-sham"
  },

  shim:{
    fabric: {
      exports: "fabric"
    },
    jquery: {
      exports: "$"
    },
    spectrum: ["jquery"],
    app: {
      deps: ["es5-shim","es5-sham","jquery"]
    }
  },

  map: {
    "*": {
      'flight': '../../vendor/flight'
    }
  }
});

require(

[
  "app",
  "spectrum"
],

function(Application){
  // kickstart the application
  var app = new Application();

  app.start();
});