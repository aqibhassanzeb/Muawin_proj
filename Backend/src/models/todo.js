import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  todos: [
    {
      text: String,
      isCompleted: Boolean,
      createdAt: String,
    },
  ],
});
export const Todo = mongoose.model("todo", todoSchema);
