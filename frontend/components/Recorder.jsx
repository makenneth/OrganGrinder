var React = require('react'),
    Track = require('../util/Track.js'),
    KeyStore = require('../stores/KeyStore'),
    KeyActions = require('../actions/KeyActions'),
    TrackActions = require('../actions/TrackActions');


var Recorder = React.createClass({
  getInitialState: function() {
    return {
      isRecording: false,
      track: new Track(""),
      playing: false
    };
  },

  componentDidMount: function() {
    KeyStore.addListener(this._keysChanged);
  },
  _keysChanged: function() {
    if (this.state.isRecording){
      this.state.track.addNotes(KeyStore.all());
    }
  },
  componentWillUnmount: function() {
    this.listener.remove();
  },
  recordNotes: function(e) {
    if (this.state.isRecording){
      var key = Mapping[e.keyCode];
      this.state.track.addNotes([key]);
    }
  },
  toggleRecording: function(e) {
    if (e !== undefined){
      if (!this.state.isRecording) {
        this.state.track.startRecording();
        this.setState({ isRecording: true });
      } else {
        this.setState({ isRecording: false });
        this.state.track.stopRecording();
        this.saveTrack();
      }
    }
  },
  saveTrack: function(){
    TrackActions.saveTrack(this.state.track);
  },
  play: function(e) {
    var playBackStartTime = Date.now(),
        currentNote = 0;
    var intervalID = setInterval(function(){
      var newNote = this.state.track.roll[currentNote];
      if (Date.now() - playBackStartTime > newNote.timeSlice){
        KeyActions.stopPlayback();
        KeyActions.playback(newNote.notes);
        currentNote++;
      }
      if (currentNote === this.state.track.roll.length - 1){
        clearInterval(intervalID);
      }
    }.bind(this), 10);
  },

  changeTrackName: function(e) {
    this.state.track.name = e.currentTarget.value;
  },

  render: function() {
    var buttonText = this.state.isRecording ? "Stop Recording" : "Start Recording";
    var playButton = this.state.playing ? "Stop" : "Play!";

    return (
      <div>
        <input type="text" onChange={this.changeTrackName}/>
        <button className="recordingButton" onClick={this.toggleRecording}>{buttonText}</button>
        <button className="playbutton" onClick={this.play}>{playButton}</button>
      </div>
    );
  }

});

module.exports = Recorder;
