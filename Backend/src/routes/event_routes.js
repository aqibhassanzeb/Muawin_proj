import express from "express";
const routes = express.Router();
import { protect } from "../middleware/user_middleware.js";
import multer from "multer";
import {
  createEvent,
  generateEvents,
  updateEvent,
} from "../controllers/event_controller.js";

const storage = multer.memoryStorage();
const upload = multer({ storage });

routes.post("/event/create", upload.array("file"), protect, createEvent);
routes.put("/event/update/:_id", protect, updateEvent);
routes.get("/event/pdf", generateEvents);

export default routes;
