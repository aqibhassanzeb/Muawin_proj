import { Event } from "../models/event.js";

export const createEvent = async (req, res) => {
  const { name, description, status, venue, leader, budget, spent, duration } =
    req.body;
  if (
    !name ||
    !description ||
    !status ||
    !venue ||
    !leader ||
    !budget ||
    !spent ||
    !duration
  ) {
    return res.status(422).json({ error: "please fill all fields " });
  }
  try {
    const event_create = new Event({
      ...req.body,
      created_by: req.user?._id,
    });
    let event = await event_create.save();
    if (event) {
      res.status(200).json({ message: "event created successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

export const updateEvent = async (req, res) => {
  const { _id } = req.params;

  try {
    await Event.findByIdAndUpdate({ _id }, req.body);
    res.status(200).json({ message: "updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "something went wrong!" });
  }
};

export const generateEvents = async (req, res) => {
  const { startDate, endDate } = req.query;

  try {
    if (!startDate || !endDate) {
      return res
        .status(400)
        .json({ error: "Start date and end date are required." });
    }
    const endOfDay = new Date(endDate);
    endOfDay.setHours(23, 59, 59, 999);
    const events = await Event.find({
      date: {
        $gte: Number(startDate),
        $lte: Number(endDate) + 86400,
      },
    });
    res.json(events);
  } catch (error) {
    console.log(error);
  }
};
