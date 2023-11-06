import mongoose from "mongoose";
import { Todo } from "../models/todo.js";
import { User } from "../models/user.js";
import { Event } from "../models/event.js";

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

export const getTodosCount = async (req, res) => {
  try {
    const count = await Todo.countDocuments({
      created_by: req.user._id,
      isCompleted: false,
    });
    res.status(200).json(count);
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

export const getMuawins = async (req, res) => {
  try {
    const users = await User.find({
      is_active: true,
      created_by: req.params._id,
    }).sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

export const getUserEvents = async (req, res) => {
  const { role } = req.user;
  try {
    const events = await Event.find({
      is_active: true,
      created_by: role === "rukan" ? req.user._id : req.user.created_by,
    }).sort({
      createdAt: -1,
    });
    res.status(200).json(events);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

export const getUserCount = async (req, res) => {
  const { role } = req.user;
  const filter = {
    is_active: true,
  };
  if (role === "rukan") {
    filter.created_by = req.user._id;
  }
  try {
    const users = await User.countDocuments(filter).sort({
      createdAt: -1,
    });
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};
