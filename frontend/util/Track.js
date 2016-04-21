var Track = function (attributes) {
  this.name = attributes.name || "";
  this.roll = attributes.roll || [];
};

Track.prototype.startRecording = function () {
  this.roll = [];

  this.startTime = Date.now();
};

Track.prototype.addNotes = function(notes) {
  var currentTime = Date.now();
  this.roll.push({ timeSlice: (currentTime - this.startTime),
    notes: notes});
};

Track.prototype.stopRecording = function() {
  this.addNotes([]);
};

module.exports = Track;
