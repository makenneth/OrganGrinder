var React = require('react');
var Track = require('../util/Track.js');
var KeyStore = require('../stores/KeyStore');
var TONES = require('../constants/tones.js');
var Note = require('../util/note.js');
var KeyActions = require('../actions/KeyActions');


var Recorder = React.createClass({
  getInitialState: function() {
    return {
      isRecording: false,
      Track: new Track(""),
      playing: false
    };
  },

  componentDidMount: function() {
    KeyStore.addListener(this._keysChanged);
  },
  _keysChanged: function() {
    if (this.state.isRecording){
      this.state.Track.addNotes(KeyStore.all());
    }
  },
  componentWillUnmount: function() {
    this.listener.remove();
  },
  recordNotes: function(e) {
    if (this.state.isRecording){
      var key = Mapping[e.keyCode];
      this.state.Track.addNotes([key]);
    }
  },
  toggleRecording: function(e) {
    if (e !== undefined){
      if (!this.state.isRecording) {
        this.state.Track = new Track({name: "wtf"});
        this.state.Track.startRecording();
        this.setState({ isRecording: true });
      } else {
        this.setState({ isRecording: false });
        this.state.Track.stopRecording();
      }
    }
  },

  play: function(e) {
    var playBackStartTime = Date.now(),
        currentNote = 0;
    var intervalID = setInterval(function(){
      var newNote = this.state.Track.roll[currentNote];
      if (Date.now() - playBackStartTime > newNote.timeSlice){
        KeyActions.stopPlayback();
        KeyActions.playback(newNote.notes);
        currentNote++;
      }
      if (currentNote === this.state.Track.roll.length - 1){
        clearInterval(intervalID);
      }
    }.bind(this), 10);
  },

  changeTrackName: function(e) {
    this.setState({trackName: e.currentTarget.value});
  },

  render: function() {
    var buttonText;
    if (this.state.isRecording) {
      buttonText = "Stop Recording";
    } else {
      buttonText = "Start Recording";
    }

    var playButton;
    if (this.state.playing) {
      playButton = "Stop";
    } else {
      playButton = "Play!";
    }

    return (

      <div>
        <button className="recordingButton" onClick={this.toggleRecording}>{buttonText}</button>
        <button className="playbutton" onClick={this.play}>{playButton}</button>
      </div>
    );
  }

});

module.exports = Recorder;
