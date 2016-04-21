var dispatcher = require("../dispatcher/dispatcher"),
    Store = require('utils/flux').Store,
    TrackStore = new Store(dispatcher);

var _tracks = [];

TrackStore.all = function(){
  return _tracks.slice();
};

function _addTrack(track){
  _tracks.push(track);
  TrackStore.__emitChange();
}

function _deleteTrack(track){
  //how to match the track
  TrackStore.__emitChange();
}

TrackStore.__onDispatch = function(payload){
  switch(payload.actionType){
    case "ADD_TRACK":
      _addTrack(payload.track);
      break;

    case "DELETE_TRACK":
      _deleteTrack(payload.track);
      break;
  }
}

module.exports = TrackStore;
