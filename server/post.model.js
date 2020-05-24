const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Post = new Schema({
  blog: mongoose.Types.ObjectId,
  published: Date,
  updated: Date,
  url: String,
  selfLink: String,
  title: String,
  content: String,
  author: {
    id: mongoose.Types.ObjectId,
    displayName: String,
    url: String,
    image: {
      url: String,
    },
  },
  replies: {
    totalItems: Number,
    selfLink: String,
  },
  isDraft: Boolean,
});

module.exports = mongoose.model("Post", Post);
