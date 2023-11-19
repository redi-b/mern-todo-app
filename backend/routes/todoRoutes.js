import express from "express";

import {
  getTodo,
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todoControllers.js";

const router = express.Router();

router.route("/").get(getTodos).post(createTodo);
router.route("/:id").get(getTodo).put(updateTodo).delete(deleteTodo);

export default router;
