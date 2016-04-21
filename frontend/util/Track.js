var Track = function (attributes) {
  this.name = attributes.name || "";
  this.roll = attributes.roll || [];
};

Track.prototype.startRecording = function () {
  this.roll = [];

  this.startTime = new Date();
};

Track.prototype.addNotes = function(notes) {
  var currentTime = new Date();
  this.roll.push({ timeSlice: (currentTime - this.StartTime),
    notes: notes});
};

Track.prototype.stopRecording = function() {
  this.addNotes([]);
};

module.exports = Track;
