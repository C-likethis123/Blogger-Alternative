const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Blog = new Schema({
  name: String,
  description: String,
  published: Date,
  updated: Date,
  url: String,
  posts: {
    totalItems: Number,
    selfLink: String,
  },
  // i don't need pages and locales actually
  pages: {
    totalItems: Number,
    selfLink: String,
  },
  locale: {
    language: String,
    country: String,
    variant: String,
  },
});

module.exports = mongoose.model("Blog", Blog);
