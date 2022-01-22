const mongoose = require("mongoose");

const Transactions = mongoose.model(
  "Transactions",
  mongoose.Schema({
    type:{
      type :String
    },
    seekerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceSeeker",
    }, 
    providerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceProvider",
    },
    address: {type: String },
    
    createdAt: {
      type: Date,
      immutable: true,
      default: () => Date.now(),
    },
    status: {
      type: String,
      default:"pending"
    },
    details: {
      type: String,
    },
    rating: {
      type: Number,
    },
    review: {
      type: String,
    },
      selectedStartDate: {type:Date},
      selectedEndDate :{type:Date},
    file: {
      type: String,
    },
  })
);
module.exports = Transactions;
