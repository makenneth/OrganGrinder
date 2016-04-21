var Dispatcher = require('../dispatcher/dispatcher');


module.exports = {
    saveTrack: function(track){
      Dispatcher.dispatch({
        actionType: "ADD_TRACK",
        track: track 
      });
    }

    removeTrack: function(track){
      Dispatcher.dispatch({
        actionType: "DELETE_TRACK",
        track: track
      })
    }
};
