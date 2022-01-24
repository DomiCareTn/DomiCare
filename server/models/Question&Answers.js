const mongoose = require("mongoose");

const QuestAns = mongoose.model(
  "QuestAns",
  new mongoose.Schema({
    postId:{
      type:String
    },
    owner: { 
      type: Object,
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
      type: String,
    },
    likesCount: {
      type: Number,
      default:0  
    },
    participants:{
      type:Array ,default:[]
    },
    commentsCount: {
      type: Number,
      default:0
    },
    type: {
      type: String,
    },
  })
);
module.exports = QuestAns;
