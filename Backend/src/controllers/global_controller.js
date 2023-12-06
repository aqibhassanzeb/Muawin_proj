import mongoose from "mongoose";
import { Todo } from "../models/todo.js";
import { Tracker, User } from "../models/user.js";
import { Event } from "../models/event.js";
import { Notification } from "../models/notification.js";
import { City } from "../models/city.js";
import { Donation } from "../models/donation.js";
import { Contact } from "../models/contact.js";

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

export const getAllCities = async (req, res) => {
  try {
    const response = await City.find({ country_code: "PK" }).sort({ name: 1 });
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

export const GetNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find()
      .populate("notificationBy", "firstName lastName image")
      .sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

export const GetDonationCount = async (req, res) => {
  try {
    const count = await Donation.countDocuments({ is_active: true });
    res.status(200).json(count);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

export const GetLogins = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const loginsCount = await Tracker.aggregate([
      {
        $match: {
          login_time: {
            $gte: today,
            $lt: tomorrow,
          },
        },
      },
      {
        $group: {
          _id: "$ip",
          count: { $sum: 1 },
        },
      },
    ]);

    const result = await Tracker.aggregate([
      {
        $group: {
          _id: { country: "$country", ip: "$ip" },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: "$_id.country",
          count: { $sum: 1 },
        },
      },
    ]);
    const headers = ["Country", "Visitors"];
    const reshapedData = result.map((item) => [item._id, item.count]);
    const output = [headers, ...reshapedData];
    res.status(200).json({ loginsCount, chartData: output });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

export const createMessage = async (req, res) => {
  const { name, email, message } = req.body;
  try {
    const contact = new Contact({
      name,
      email,
      message,
    });
    let created = await contact.save();
    if (created) {
      res.status(200).json({ message: "Message sent successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

export const getContacts = async (req, res) => {
  try {
    const response = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

export const clearNotifications = async (req, res) => {
  const userId = req.params.userId;
  try {
    try {
      await Notification.updateMany(
        { isClearBy: { $nin: [userId] } },
        { $addToSet: { isClearBy: userId } }
      );

      res.status(200).json({ message: "Mark as clear successfully" });
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};
