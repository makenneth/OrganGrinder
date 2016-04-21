var Dispatcher = require('./dispatcher/dispatcher');
var Note = require('./util/note');
var React = require('react');
var ReactDOM = require('react-dom');
var Organ = require('./components/organ');
var KeyListener = require('./util/KeyListener');


document.addEventListener("DOMContentLoaded", function(){
  ReactDOM.render(<Organ />, document.getElementById("root"));
  KeyListener.keyUp();
  KeyListener.keyDown();
});
