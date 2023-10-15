import express from "express";
const routes = express.Router();
import { protect } from "../middleware/user_middleware.js";
import {
  createTodo,
  getCities,
  getTodos,
  updateTodo,
} from "../controllers/global_controller.js";

routes.get("/cities/:country/:state", getCities);
routes.get("/todos/:id", getTodos);
routes.put("/todos/:_id", protect, updateTodo);
routes.post("/todos", protect, createTodo);

export default routes;
