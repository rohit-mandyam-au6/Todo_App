const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ColumnSchema = new Schema(
  {
    title: { type: String, required: true },
    columnId: { type: String, required: true },
    todoIds: [{ type: String, ref: "todo" }],
    /*columnOrder: [{ type: String, ref: "columns" }],*/
  },
  { timestamps: true }
);

const Column = mongoose.model("columns", ColumnSchema);

module.exports = Column;
