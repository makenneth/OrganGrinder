var Dispatcher = require('../dispatcher/dispatcher');

var KeyActions = {
  keydown: function (note) {
    Dispatcher.dispatch({
      actionType: "PLAY_NOTE",
      note: note
    });
  },

  keyup: function(note) {
    Dispatcher.dispatch({
      actionType: "STOP_NOTE",
      note: note
    });
  },

  playback: function(notes){
    Dispatcher.dispatch({
      actionType: "PLAY_NOTES",
      notes: notes
    });
  },
  stopPlayback: function(){
    Dispatcher.dispatch({
      actionType: "REMOVE_NOTES"
    });
  }
};

module.exports = KeyActions;
