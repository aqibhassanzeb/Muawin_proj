import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    status: String,
    venue: String,
    leader: String,
    budget: String,
    spent: String,
    duration: String,
    date: Number,
    files: [],
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    ratings: [
      {
        byUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        rating: { type: Number, min: 1, max: 5 },
      },
    ],
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Event = mongoose.model("event", eventSchema);
