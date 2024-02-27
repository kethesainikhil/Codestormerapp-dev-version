const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomId: {
    type: String,
    unique: true,
    required: true,
  },
});

module.exports = mongoose.model('Room', roomSchema);