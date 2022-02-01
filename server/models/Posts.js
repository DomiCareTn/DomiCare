const mongoose = require("mongoose");

const Posts = mongoose.model(
  "Posts",
  new mongoose.Schema({
    serviceProvider_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceProvider",
    },
    serviceSeeker_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceSeeker",
    },
    createdAt: {
      type: Date,
      immutable: true,
      default: () => Date.now(),
    },
    title: {
      type: String,
    },
    content: {
      type: String
    },
    
    city: {
      type: String,
    },
    type: {
      type: String,
    },
    availability: {
      type: Date,
    },
    startDate:{
      type: Date
    },
    endDate:{
      type: Date
    },
    Adress:{
      type: String
    },
    file: {
      type: String,
    },

    adress: { String },
  })
);
module.exports = Posts;
