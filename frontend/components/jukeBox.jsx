var React = require('react'),
    TrackPlayer = require('./trackPlayer.jsx');

var JukeBox = React.createClass({

  render: function(){
    return (
      <div>
        {this.props.tracks.map(function(track){
          return <li><TrackPlayer track={track} /></li>;
        })}
      </div>
    );
  }
});

module.exports = JukeBox;
