var React = require('react'),
    TrackActions = require('../actions/TrackActions');

var TrackPlayer = React.createClass({
  getInitialState: function(){
    return {playing: false};
  }
  playTrack: function(){
    this.props.track.play(); //play belongs to the recorder..borrow it?
  },
  stopTrack: function(){
    this.props.track.stop(); //how?
  },
  deleteTrack: function(){
    TrackActions.removeTrack();
  },
  render: function(){
    var playButton = this.state.playing ?
        <button onClick={this.stopTrack}>Stop</button> :
        <button onClick={this.playTrack}>Play</button>;
    return (
      <p>{this.props.track.name}</p>
      {playButton}
      <button onClick="">Delete</button>

    );
  }
});

module.exports = TrackPlayer;
