import express from "express";
const routes = express.Router();
import { protect } from "../middleware/user_middleware.js";

import {
  Donate,
  MarkDonate,
  createDonation,
  getAllDonations,
  updateDonation,
} from "../controllers/donation_controller.js";

routes.post("/create-donation", createDonation);
routes.get("/donations", getAllDonations);
routes.post("/donate/:donationId", Donate);
routes.put("/update-donation/:donationId", updateDonation);
routes.put("/update-mark/:donationId/:donorId", MarkDonate);

export default routes;
