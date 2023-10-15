import mongoose from "mongoose";
import { Todo } from "../models/todo.js";

export const getCities = async (req, res) => {
  let { country, state } = req.params;
  try {
    const collection = mongoose.connection.db.collection("cities");
    const response = await collection
      .find({ country_name: country, state_name: state })
      .sort({ name: 1 })
      .toArray();

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

export const createTodo = async (req, res) => {
  try {
    const { text } = req.body;
    let todo = await Todo.findOne({ created_by: req.user._id });

    if (!todo) {
      todo = new Todo({
        todos: {
          text,
          createdAt: new Date().toISOString(),
          isCompleted: false,
        },
        created_by: req.user._id,
      });
    } else {
      todo.todos.push({
        text,
        isCompleted: false,
        createdAt: new Date().toISOString(),
      });
    }
    const savedTodo = await todo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getTodos = async (req, res) => {
  let { id } = req.params;
  try {
    const response = await Todo.findOne({ created_by: id });

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

export const updateTodo = async (req, res) => {
  const { _id } = req.param;
  const { isCompleted } = req.body;

  try {
    const todos = await Todo.findOne({ created_by: req.user._id });
    const todoIndex = todos.todos.findIndex((todo) => todo._id === _id);
    console.log(todoIndex);
    if (todoIndex === -1) {
      return res.status(404).json({ error: "todo not found" });
    }
    todos[todoIndex].isCompleted = isCompleted;
    await todos.save();
    res.status(200).json({ message: "updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "something went wrong!" });
  }
};
