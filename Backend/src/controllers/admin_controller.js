import { Event } from "../models/event.js";
import { User } from "../models/user.js";

export const getEvents = async (req, res) => {
  try {
    const events = await Event.find({ is_active: true }).sort({
      createdAt: -1,
    });
    res.status(200).json(events);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

export const eventsForCalender = async (req, res) => {
  try {
    const events = await Event.find({ is_active: true }).sort({
      createdAt: -1,
    });
    res.status(200).json(events);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({ is_active: true }).sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};
