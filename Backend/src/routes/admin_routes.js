import express from "express";
const routes = express.Router();
import { protect } from "../middleware/user_middleware.js";
import {
  eventsForCalender,
  getEvents,
  getMembers,
  updateMember,
} from "../controllers/admin_controller.js";

routes.get("/events", getEvents);
routes.get("/events/calendar", eventsForCalender);
routes.get("/users", getMembers);
routes.put("/users/:_id", updateMember);

export default routes;
