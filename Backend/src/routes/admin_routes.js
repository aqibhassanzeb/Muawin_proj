import express from "express";
const routes = express.Router();
import { protect } from "../middleware/user_middleware.js";
import {
  eventsForCalender,
  getEvents,
  getUsers,
} from "../controllers/admin_controller.js";

routes.get("/events", getEvents);
routes.get("/events/calendar", eventsForCalender);
routes.get("/users", getUsers);

export default routes;
