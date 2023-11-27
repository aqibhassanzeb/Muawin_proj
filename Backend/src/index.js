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

//REAL TIME CHAT
io.on("connection", (socket) => {
  console.log("User connected to socket:", socket.id);

  socket.on("join", (roomId) => {
    socket.join(roomId);
  });

  socket.on("message", async (roomId, message) => {
    try {
      const newMessage = new Message({
        senderId: message.senderId,
        recepientId: message.recepientId,
        messageType: message.messageType,
        message: message.messageText,
        timestamp: new Date(),
        imageUrl: message.messageType === "image" ? message.imageUrl : null,
      });
      await newMessage.save();
      io.to(roomId).emit("message", newMessage);
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("adminBroadcast", async (notification) => {
    try {
      const newNotification = new Notification({ message: notification });
      await newNotification.save();
      io.emit("notification", newNotification);
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("markAsRead", async (notificationId, userId) => {
    try {
      await Notification.findByIdAndUpdate(
        notificationId,
        { $addToSet: { isReadBy: userId } },
        { new: true }
      );

      io.to(userId).emit("notificationRead", notificationId);
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
