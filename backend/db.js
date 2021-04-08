var mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/Todo_App", {
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
