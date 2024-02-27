// server/routes/room.js
const express = require('express');
const videoRouter = express.Router();
const Room = require('../models/room');

videoRouter.post('/create', async (req, res) => {
  try {
    const { roomId } = req.body;

    // Check if the room already exists
    const existingRoom = await Room.findOne({ roomId });
    if (existingRoom) {
      return res.json({ roomId ,message: 'Room already exists'});
    }

    // Create a new room
    const newRoom = new Room({ roomId });
    await newRoom.save();

    res.json({ roomId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = videoRouter;
