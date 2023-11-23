import { Tracker, User } from "../models/user.js";
import axios from "axios";

export const handleTrack = async (req, res) => {
  const { id, ip } = req.body;

  const user = await User.findById(id);
  if (user) {
    if (user.first_login === "Nil") {
      user.first_login = new Date().toISOString();
    }
    user.last_login = new Date().toISOString();
  }

  await axios(`https://ipinfo.io/${ip}?token=8190e9ffbe9de4`).then((res) => {
    const track = new Tracker({
      user: id,
      login_time: new Date().toISOString(),
      // country,
      // city,
      ip,
    });
  });

  try {
    await user.save();
    await track.save();
    res.status(201).json({ message: "User log saved" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while taking log" });
  }
};
