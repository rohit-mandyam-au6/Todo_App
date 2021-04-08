const express = require("express");
const router = express.Router();
const {
  getTodos,
  createTodo,
  reorderSameCol,
  reorderDiffCol,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoControllers");

//route to get todos
router.get("/todos/getAll", getTodos);

//route to create todos
router.post("/todos/create", createTodo);

//route to update todos
router.put("/todos/update/:todoId", updateTodo);

////route to delete todos
router.delete("/todos/delete/:todoId", deleteTodo);

//re-arrange in same col
router.post("/todos/reorder/samecolumn", reorderSameCol);

//re-arrange in diff col
router.post("/todos/reorder/differentcolumn", reorderDiffCol);


module.exports = router;
