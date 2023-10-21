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
    const todo_create = new Todo({
      text: req.body.text,
      isCompleted: false,
      created_by: req.user?._id,
    });
    let todo = await todo_create.save();
    if (todo) {
      res.status(200).json({ message: "todo created successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

export const getTodos = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const skip_index = (page - 1) * limit;
  try {
    const response = await Todo.find({ created_by: req.user._id })
      .sort({
        createdAt: -1,
      })
      .skip(skip_index)
      .limit(limit);
    const count = await Todo.countDocuments({ created_by: req.user._id });
    const total_pages = Math.ceil(count / limit);

    res
      .status(200)
      .json({ todos: response, count, per_page: limit, pages: total_pages });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

export const updateTodo = async (req, res) => {
  const { _id } = req.params;
  try {
    await Todo.findByIdAndUpdate({ _id }, req.body);
    res.status(200).json({ message: "updated successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteTodo = async (req, res) => {
  const { _id } = req.params;
  try {
    await Todo.findByIdAndDelete({ _id });
    res.status(200).json({ message: "delete successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
