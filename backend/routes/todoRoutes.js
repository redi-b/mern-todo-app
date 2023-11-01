import express from "express";

import {
  getTodo,
  getTodos,
  updateTodo,
  createTodo,
  deleteTodo,
} from "../controllers/todoControllers.js";

const router = express.Router();

router.route("/todos").get(getTodos).post(createTodo);
router.route("/todos/:id").get(getTodo).put(updateTodo).delete(deleteTodo);

export default router;
