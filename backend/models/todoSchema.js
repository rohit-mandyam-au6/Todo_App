const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoItem = new Schema(
  {
    todoId: { type: String, required: true },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Open", "Work In-Progress", "Completed"],
      default: "Open",
    },
    column: { type: String, ref: "columns" },
    createdDate: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

const Todo = mongoose.model("todo", todoItem);

module.exports = Todo;
