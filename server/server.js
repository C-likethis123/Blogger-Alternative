const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const cors = require("cors");

const mongoose = require("mongoose");
const PORT = 4000;

mongoose.connect("mongodb://127.0.0.1:27017/todos", { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});

app.use(cors());
app.use(bodyParser.json());

let ToDo = require('./todo.model');
const todoRoutes = express.Router();

todoRoutes.route("/").get(function(req, res) {
  ToDo.find(function(err, todos) {
    if (err) {
      console.log(err);
    } else {
      res.json(todos);
    }
  });
});

todoRoutes.route("/:id").get(function(req, res) {
  let id = req.params.id;
  ToDo.findById(id, function(err, todo) {
    res.json(todo);
  });
});

todoRoutes.route("/add").post(function(req, res) {
  let todo = new ToDo(req.body);
  todo
    .save()
    .then(todo => {
      res.status(200).json({ todo: "todo added successfully" });
    })
    .catch(err => {
      res.status(400).send("adding new todo failed");
    });
});

todoRoutes.route("/update/:id").post(function(req, res) {
  ToDo.findById(req.params.id, function(err, todo) {
    if (!todo) {
      res.status(404).send("data is not found");
    } else {
      todo.description = req.body.description;
      todo.responsible = req.body.responsible;
      todo.priority = req.body.priority;
      todo.isCompleted = req.body.isCompleted;

      todo
        .save()
        .then(todo => {
          res.json("Todo updated!");
        })
        .catch(err => {
          res.status(400).send("Update not possible!");
        });
    }
  });
});

app.use("/todos", todoRoutes);

app.listen(PORT, function() {
  console.log("Server is running on PORT: " + PORT);
});
