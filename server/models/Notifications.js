const mongoose = require("mongoose");

const Notifications = mongoose.model(
  "Notifications",
  new mongoose.Schema({
    provider_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceProvider",
    },
    seeker_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceSeeker",
    },
    createdAt: {
      type: Date,
      immutable: true,
      default: () => Date.now(),
    },
    content: {
      type: String
    },
    type: {
      type: String,
    },
    
  })
);
module.exports = Notifications;
