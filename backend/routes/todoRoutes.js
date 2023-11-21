import express from "express";

import {
  getTodo,
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todoControllers.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const todoRouter = express.Router();

// protect routes
todoRouter.use(authMiddleware);

todoRouter.route("/").get(getTodos).post(createTodo);
todoRouter.route("/:id").get(getTodo).put(updateTodo).delete(deleteTodo);

export default todoRouter;
