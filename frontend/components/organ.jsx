var React = require('react'),
    OrganKey = require('./organKey'),
    TONES = require('../constants/tones'),
    Recording = require('./Recorder');

var Organ = React.createClass({
  render: function() {
    return (
      <div>
      <p className="title">Organ Grinder</p>
        <div className="container">
        {
          Object.keys(TONES).map(function(tone, idx){
            return <OrganKey key={idx} noteName={tone}/>;
          })
        }

        <Recording />
        </div>
      </div>
    );
  }

});

module.exports = Organ;
