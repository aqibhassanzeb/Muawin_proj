import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "director", "member"],
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    verification_code: {
      type: String,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    temp_email: {
      tyep: String,
    },
    email_verified: {
      type: Boolean,
      default: false,
    },
    resetCode: String,
    expireToken: Date,
  },
  { timestamps: true }
);
export const User = mongoose.model("user", UserSchema);

const trackerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  login_time: Date,
});

export const Tracker = mongoose.model("login-tracker", trackerSchema);
