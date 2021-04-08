const express = require("express");
const router = express.Router();

const { getAll, createColumn, editColumn } = require("../controllers/columnControllers");

//route to get column
router.get("/columns/all", getAll);

//route to create column
router.post("/columns/create", createColumn);

//route to edit column
router.put("/columns/update/:todoId", editColumn);

module.exports = router;
