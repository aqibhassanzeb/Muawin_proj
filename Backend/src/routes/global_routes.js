import express from "express";
const routes = express.Router();
import { protect } from "../middleware/user_middleware.js";
import {
  createTodo,
  deleteTodo,
  getCities,
  getMuawins,
  getTodos,
  getTodosCount,
  getUserCount,
  updateTodo,
} from "../controllers/global_controller.js";

routes.get("/cities/:country/:state", getCities);
routes.get("/todos", protect, getTodos);
routes.get("/todos_count", protect, getTodosCount);
routes.put("/todos/:_id", protect, updateTodo);
routes.post("/todos", protect, createTodo);
routes.delete("/todos/:_id", protect, deleteTodo);
routes.get("/muawins/:_id", getMuawins);
routes.get("/users_counts", protect, getUserCount);

export default routes;
