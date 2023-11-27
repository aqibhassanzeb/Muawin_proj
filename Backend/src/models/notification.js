import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    message: String,
    isReadBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

export const Notification = mongoose.model("notification", notificationSchema);
