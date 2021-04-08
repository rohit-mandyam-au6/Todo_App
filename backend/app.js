const express = require("express");
const logger = require("morgan");
const methodOverride = require("method-override");
const mongoose = require("mongoose");

//Db Connection
mongoose.promise = global.Promise;

mongoose
  .connect("mongodb://localhost/todoBoards", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(function () {
    console.log("Database connected successfully");
  })
  .catch(function (err) {
    console.log(err.message);
  });

//require("./db");

//todo routes
const todoRoutes = require("./routes/todoRoutes");

var app = express();

app.use(logger("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(todoRoutes);
app.use(methodOverride("_method"));

app.listen(5000, () => {
  console.log("Server running on port 5000.");
});
