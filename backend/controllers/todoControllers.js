import Todo from "../models/todoModel.js";
import asynchandler from "express-async-handler";

const getTodos = asynchandler(async (req, res) => {
  try {
    let todos = await Todo.find();

    res.status(200).json({ ...todos });
  } catch (error) {
    res.status(500);
    throw new Error("Couldn't get todos");
  }

  res.status(200).json({ message: "Get Todos" });
});

const getTodo = asynchandler(async (req, res) => {
  const { id } = req.params;

  try {
    let todo = await Todo.findById(id);

    res.status(200).json({
      _id: todo._id,
      title: todo.title,
      body: todo.body,
      completed: todo.completed,
      createdAt: todo.createdAt,
      updatedAt: todo.updatedAt,
    });
  } catch (error) {
    res.status(404);
    throw new Error("Todo not found");
  }

  res.status(200).json({ message: "Get Todos" });
});

const createTodo = asynchandler(async (req, res) => {
  const { title, body } = req.body;

  if (!title || !body) {
    res.status(400);
    throw new Error("Please fill out all fields");
  }

  try {
    let todo = await Todo.create({ title, body });

    res.status(200).json({
      _id: todo._id,
      title,
      body,
      completed: todo.completed,
      createdAt: todo.createdAt,
      updatedAt: todo.updatedAt,
    });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const updateTodo = asynchandler(async (req, res) => {
  const { id } = req.params;
  const { title, body, completed } = req.body;

  try {
    const todo = await Todo.findById(id);

    todo.title = title || todo.title;
    todo.body = body || todo.body;
    todo.completed = completed || todo.completed;

    todo.save();

    res.status(200).json({
      message: `'${todo.title}' updated!`,
      todo: {
        _id: todo._id,
        title: todo.title,
        body: todo.body,
        completed: todo.completed,
        createdAt: todo.createdAt,
        updatedAt: todo.updatedAt,
      },
    });
  } catch (error) {
    res.status(404);
    throw new Error(`Couldn't find todo`);
  }
});

const deleteTodo = asynchandler(async (req, res) => {
  const { id } = req.params;

  const todo = await Todo.findByIdAndDelete(id);

  try {
    res.status(200).json({
      message: `'${todo.title}' deleted!`,
      todo: {
        _id: todo._id,
        title: todo.title,
        body: todo.body,
        completed: todo.completed,
        createdAt: todo.createdAt,
        updatedAt: todo.updatedAt,
      },
    });
  } catch (error) {
    res.status(404);
    throw new Error(`Couldn't find todo`);
  }
});

export { getTodos, getTodo, createTodo, updateTodo, deleteTodo };
