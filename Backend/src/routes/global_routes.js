import express from "express";
const routes = express.Router();
import { protect } from "../middleware/user_middleware.js";
import {
  createTodo,
  deleteTodo,
  getCities,
  getTodos,
  updateTodo,
} from "../controllers/global_controller.js";

routes.get("/cities/:country/:state", getCities);
routes.get("/todos", protect, getTodos);
routes.put("/todos/:_id", protect, updateTodo);
routes.post("/todos", protect, createTodo);
routes.delete("/todos/:_id", protect, deleteTodo);

export default routes;
