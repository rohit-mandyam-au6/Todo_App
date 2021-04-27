const express = require("express");
const logger = require("morgan");
const cors = require("cors");
//const methodOverride = require("method-override");
const mongoose = require("mongoose");
const bodyParser = require( "body-parser");

require("./db");

const todoRoutes = require("./routes/todoRoutes");
const colRoutes = require("./routes/columnRoutes");

var app = express();

app.options("*", cors());
app.use(cors());

app.use(logger("dev"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//app.use(express.json());
//app.use(express.urlencoded({ extended: true }));

app.use(todoRoutes);
app.use(colRoutes);
//app.use(methodOverride("_method"));

app.listen(5000, () => {
  console.log("Server running on port 5000.");
});
