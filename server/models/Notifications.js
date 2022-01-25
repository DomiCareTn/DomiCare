const mongoose = require("mongoose");

// 
const Notifications = mongoose.model(
  "Notifications",
  new mongoose.Schema({
    sender: {
      type: Object
    },
    receiver_id: {
      type: String
    },
    seen:{
      type:Boolean,
      default: false
    },
    postId:{
      type: String
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
