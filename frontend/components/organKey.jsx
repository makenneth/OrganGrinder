var React = require('react'),
    Note = require('../util/note'),
    TONES = require('../constants/tones'),
    KeyStore = require('../stores/KeyStore');

var OrganKey = React.createClass({
  getInitialState: function() {
    return {
      pressed: false
    };
  },
  componentDidMount: function() {
    var freq = TONES[this.props.noteName];
    this.note = new Note(freq);
    this.listener = KeyStore.addListener(this.start);
  },
  componentWillUnmount: function() {
    this.listener.remove();
  },
  start: function() {
    if (KeyStore.keyCheck(this.props.noteName)){
      this.note.start();
      this.setState({pressed: true});
    } else if (this.state.pressed){
      this.note.stop();
      this.setState({pressed: false});
    }
  },
  render: function() {
    var opacity = this.state.pressed ? "0.5" : "1";
    var keyClass = this.props.noteName.match(/s/) ? "blackKey" : "whiteKey";
    return (
      <div style={{"opacity": opacity}} className={keyClass}></div>
    );
  }

});

module.exports = OrganKey;
