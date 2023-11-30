import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    address: String,
    blood: String,
    city: String,
    dob: String,
    email: String,
    gender: String,
    height: Number,
    maritalStatus: String,
    medicalCondition: String,
    nationality: String,
    phone: Number,
    province: String,
    religion: String,
    weight: Number,
    zip: Number,
    emergencyContact: Number,
    fatherName: String,
    motherName: String,
    spouseName: String,
    dependents: Number,
    siblings: String,
    familyContact: Number,
    educationLevel: String,
    institute: String,
    major: String,
    graduationYear: Number,
    certificates: String,
    gpa: String,
    awards: String,
    jobTitle: String,
    industry: String,
    responsibilities: String,
    skills: String,
    references: String,
    company: String,
    licenses: String,
    positions: String,
    workHistory: String,
    workExperience: Number,
    interests: String,
    languages: String,
    socialMediaProfiles: String,
    volunteerWork: String,
    militaryServices: String,
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    first_login: {
      type: String,
      default: "Nil",
    },
    last_login: {
      type: String,
      default: "Nil",
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "rukan", "muawin", "donor", "director"],
    },
    password: {
      type: String,
      required: true,
    },
    permissions: ["create", "update", "delete"],
    verification_code: {
      type: String,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    image: {
      type: String,
      default: process.env.DEFAULT_PROFILE_IMAGE,
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
  ip: String,
  country: String,
  city: String,
});

export const Tracker = mongoose.model("login-tracker", trackerSchema);
