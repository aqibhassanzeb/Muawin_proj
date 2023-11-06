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
  const { role } = req.user;
  try {
    const events = await Event.find({
      is_active: true,
      created_by:
        role === "admin"
          ? ""
          : role === "rukan"
          ? req.user._id
          : req.user.created_by,
    }).sort({
      createdAt: -1,
    });
    res.status(200).json(events);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

export const getMembers = async (req, res) => {
  try {
    const users = await User.find({
      is_active: true,
      role: { $ne: "admin" },
    }).sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

export const updateMember = async (req, res) => {
  const { _id } = req.params;

  try {
    await User.findByIdAndUpdate({ _id }, req.body);
    res.status(200).json({ message: "updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "something went wrong!" });
  }
};
