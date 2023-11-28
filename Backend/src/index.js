import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server as socketIo } from "socket.io";

dotenv.config();
import "./config.js";
import Auth from "./routes/auth_routes.js";
import MessageRoutes from "./routes/message_routes.js";
import Global from "./routes/global_routes.js";
import Event from "./routes/event_routes.js";
import Admin from "./routes/admin_routes.js";
import { Message } from "./models/message.js";
import { Notification } from "./models/notification.js";

const app = express();

const server = http.createServer(app);
const io = new socketIo(server, {
  cors: {
    origin: "*",
  },
});

//middelwares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: true,
    credentials: true,
    defaultErrorHandler: false,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.static("public"));

//All APi's Endponits
app.use("/api/v1", Auth, Global, MessageRoutes, Event, Admin);

app.use("*", (req, res) => {
  return res.status(404).json({
    message: "Backend is running..",
  });
});

io.on("connection", async (socket) => {
  socket.on("adminBroadcast", async (notification) => {
    try {
      await Notification.create({
        message: notification,
        notificationBy: "6523995e4c1094b032c6c61d",
      });

      io.emit("notification");
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("markAllAsRead", async (userId) => {
    try {
      await Notification.updateMany(
        { isReadBy: { $nin: [userId] } },
        { $addToSet: { isReadBy: userId } }
      );

      socket.emit("allNotificationsRead");
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

//Port
const port = process.env.PORT || 3333;
const nodeServer = server.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});
