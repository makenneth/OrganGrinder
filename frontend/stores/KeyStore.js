var Store = require('flux/utils').Store;
var Dispatcher = require('../dispatcher/dispatcher');

var KeyStore = new Store(Dispatcher);

var _keys = [];

KeyStore.all = function() {
  return _keys.slice();
};

var add = function(key){
  if (!KeyStore.keyCheck(key)){
     _keys.push(key);
     KeyStore.__emitChange();
   }
};

var destroy = function(key){
  for (var i = 0; i < _keys.length; i++) {
    if (key === _keys[i]) {
      _keys.splice(i, 1);
      KeyStore.__emitChange();
      return;
    }
  }
};

var reset = function(notes){
  _keys = notes;
  KeyStore.__emitChange();
};

var empty = function(){
  _keys = [];
  KeyStore.__emitChange();
};
KeyStore.keyCheck = function(key){
  if (_keys.indexOf(key) !== -1){
    return true;
  }
  return false;
};

KeyStore.__onDispatch = function(payload) {
  switch(payload.actionType){
    case "PLAY_NOTE":
      add(payload.note);
      break;
    case "STOP_NOTE":
      destroy(payload.note);
      break;
    case "PLAY_NOTES":
      reset(payload.notes);
      break;
    case "REMOVE_NOTES":
      empty();
      break;

  }
};


module.exports = KeyStore;
