const keys = require("./keys");
const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const cors = require("cors");

const mongoose = require("mongoose");
const PORT = 4000;

mongoose
  .connect(keys.mongodb.dbURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
const connection = mongoose.connection;

connection
  .once("open", function () {
    console.log("MongoDB database connection established successfully");
  })
  .catch(err => console.log("Unable to start server"));

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));

const postRoutes = require('./routes/postRoutes');

app.use("/posts", postRoutes);

app.listen(PORT, function () {
  console.log("Server is running on PORT: " + PORT);
});
