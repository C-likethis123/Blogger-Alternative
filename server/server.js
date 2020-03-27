const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const cors = require("cors");

const mongoose = require("mongoose");
const PORT = 4000;

mongoose.connect("mongodb://127.0.0.1:27017/posts", { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});

app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));

let Post = require('./post.model');
const postRoutes = express.Router();

postRoutes.route("/").get(function(req, res) {
  Post.find(function(err, posts) {
    if (err) {
      console.log(err);
    } else {
      res.json(posts);
    }
  });
});

postRoutes.route("/:id").get(function(req, res) {
  let id = req.params.id;
  Post.findById(id, function(err, post) {
    if (!post) {
      res.status(404).send("Cannot find the requested content");
    }
    res.json(post);
  });
});

postRoutes.route("/add").post(function(req, res) {
  let post = new Post(req.body);
  post
    .save()
    .then(post => {
      res.status(200).json({ post: post });
    })
    .catch(err => {
      res.status(400).send("adding new post failed");
    });
});

postRoutes.route("/update/:id").post(function(req, res) {
  Post.findById(req.params.id, function(err, post) {
    if (!post) {
      res.status(404).send("data is not found");
    } else {
      post.title = req.body.title;
      post.content = req.body.content;
      post.isDraft = req.body.isDraft;

      post
        .save()
        .then(post => {
          res.json("post updated!");
        })
        .catch(err => {
          res.status(400).send("Update not possible!");
        });
    }
  });
});

postRoutes.route("/:id").delete(function(req, res) {
  Post.findByIdAndDelete(req.params.id, function(err, post) {
    if (!post) {
      res.status(404).send("The requested post cannot be found!");
    } else {
      res.status(200).send(`Deleted post: ${post}`);
    }
  })
})

app.use("/posts", postRoutes);

app.listen(PORT, function() {
  console.log("Server is running on PORT: " + PORT);
});
