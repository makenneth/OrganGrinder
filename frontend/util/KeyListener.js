var TONES = require('../constants/tones');
var KeyAction = require('../actions/KeyActions');

var Mapping = {
  65: "C5",
  87: "Cs5",
  83: "D5",
  69: "Ds5",
  68: "E5",
  70: "F5",
  84: "Fs5",
  71: "G5",
  89: "Gs5",
  72: "A5",
  85: "As5",
  74: "B5",
  75: "C6"
};


var keyup = function(e) {
  if (e.target.tagName !== "INPUT"){
    var key = Mapping[e.keyCode];
    KeyAction.keyup(key);
  }
};

var keydown = function(e) {
  if (e.target.tagName !== "INPUT"){
    var key = Mapping[e.keyCode];
    KeyAction.keydown(key);
  }
};


module.exports = {
  keyUp: function(){
    $(document).on("keyup", keyup);
  },
  keyDown: function(){
    $(document).on("keydown", keydown);
  }
};
