const ColumnSchema = require("../models/columnSchema");

const columnControllers = {};

//Get Columns
columnControllers.getAll = async (req, res) => {
  try {
    await ColumnSchema.find().then(function (cols) {
      res.send(cols);
      return res.redirect("/columns/all");
    });
  } catch (err) {
    console.log(err.message);
    res.json({ success: false, error: err.message });
  }
};

//Create Columns
columnControllers.createColumn = async (req, res) => {
  try {
    const column = new ColumnSchema({
      title: req.body.title,
      columnId: req.body.columnId,
      todoIds: [],
    });
    await column.save().then(function (column) {
      console.log(column);
      return res.redirect("/columns/all");
    });
  } catch (err) {
    console.log(err.message);
    res.json({ success: false, error: err.message });
  }
};

//edit Columns
columnControllers.editColumn = async (req, res) => {
  try {
    const { columnId } = req.params;
    if (req.query.title) {
      ColumnSchema.findOneAndUpdate(
        columnId,
        { title: req.body.title },
        { new: true }
      )
        .exec()
        .then((column) => {
          if (!column) {
            return res
              .status(404)
              .json({ message: "unable to find the column of provided id" });
          }

          return res
            .status(200)
            .json({ message: "column title updated ", data: column.title });
        });

      return res.redirect("/");
    } else {
      return res.status(404).json({ message: "Title not found in the query" });
    }
  } catch (err) {
    console.log(err.message);
    res.json({ success: false, error: err.message });
  }
};

module.exports = columnControllers;
