import mongoose from "mongoose";

const todoSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    completed: { type: Boolean, default: false },
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
