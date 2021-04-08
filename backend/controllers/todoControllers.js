const todoSchema = require("../models/todoSchema");
const Column = require("../models/columnSchema");

const todoControllers = {};

//Get Todos
todoControllers.getTodos = function (req, res) {
  todoSchema.find().then(function (todos) {
    res.send(todos);
    return res.redirect("/");
  });
};

//Create Todos
todoControllers.createTodo = async (req, res) => {
  try {
    const todo = new todoSchema({
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
    });

    switch (status) {
      case "Open":
        todoSchema.status = "Open";
        break;
      case "Work In-Progress":
        todoSchema.status = "Work In-Progress";
        break;
      case "Completed":
        todoSchema.status = "Completed";
        break;
      default:
        throw new Error("no case found");
    }

    await todo.save().then(function (todo) {
      console.log(todo);
      return res.redirect("/");
    });
  } catch (err) {
    console.log(err.message);
    res.json({ success: false, error: err.message });
  }
};

//Update Todos
todoControllers.updateTodo = async (req, res) => {
  try {
    var todoId = req.params.todoId;
    var updatedTitle = req.body.title;
    var updatedDescr = req.body.description;
    await todoSchema
      .updateOne(
        { _id: todoId },
        { $set: { title: updatedTitle, description: updatedDescr } }
      )
      .then(function (todo) {
        console.log(todo);
        return res.redirect("/");
      });
  } catch (err) {
    console.log(err.message);
    res.json({ success: false, error: err.message });
  }
};

//Delete Todos
todoControllers.deleteTodo = (req, res) => {
  try {
    var todoId = req.params.todoId;
    todoSchema.deleteOne({ _id: todoId }).then(function (todo) {
      console.log(todo);
      return res.redirect("/");
    });
  } catch (err) {
    console.log(err.message);
    res.json({ success: false, error: err.message });
  }
};

//Re-arrange in same column
todoControllers.reorderSameCol = async (req, res, next) => {
  try {
    const { sameColumnId, samecolumnCardIds } = req.body;
    console.log(sameColumnId, samecolumnCardIds);
    const column = await Column.findOne({ columnId: sameColumnId });
    if (!column) {
      return res
        .status(404)
        .json({ message: "unable to find column of provided id" });
    }
    column.set({ cardIds: samecolumnCardIds });
    const savedColumn = await column.save();

    res
      .status(200)
      .json({ message: "same column reorder success", savedColumn });

    return res.redirect("/");
    
  } catch (err) {
    console.log(err.message);
    res.json({ success: false, error: err.message });
  }
};

////Re-arrange in diff column
todoControllers.reorderDiffCol = async (req, res, next) => {
  try {
    const {
      removedColumnId,
      addedColumnId,
      removedColumnCardIds,
      addedColumnCardIds,
    } = req.body;
    if (
      !(
        removedColumnId &&
        addedColumnId &&
        removedColumnCardIds &&
        addedColumnCardIds
      )
    ) {
      return res.status(400).json({ message: "some fields are missing" });
    }

    const removedcolumn = await Column.findOne({ columnId: removedColumnId });
    removedcolumn.set({ cardIds: removedColumnCardIds });
    await removedcolumn.save();

    const addedcolumn = await Column.findOne({ columnId: addedColumnId });
    addedcolumn.set({ cardIds: addedColumnCardIds });
    await addedcolumn.save();

    res.status(200).json({ message: "different column reorder success" });

    return res.redirect("/");

  } catch (err) {
    console.log(err.message);
    res.json({ success: false, error: err.message });
  }
};

module.exports = todoControllers;
