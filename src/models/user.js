import mongoose from "mongoose";
import validator from "validator";

const schema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: [true, "Enter the name"],
    },
    name: {
      type: String,
      required: [true, "Please Enter name"],
    },
    search: {
      type: String,
      required: [false],
    },
    email: {
      type: String,
      unique: [true, "Email already exists"],
      required: [true, "Please Enter Email"],
      validate: validator.isEmail,
    },
    photo: {
      type: String,
      required: [true, "Please the photo"],
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      default: "user",
      required: [true, "Please Enter Gender"],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
      required: [true, "Please Enter role"],
    },
    dob: {
      type: Date,
      required: [true, "Please Enter Date of Birth"],
    },
  },
  {
    timestamps: true,
  }
);

schema.virtual("age").get(function () {
  const today = new Date();
  const dob = this.dob;
  let age = today.getFullYear() - dob.getFullYear();
  if (
    today.getMonth() < dob.getMonth() ||
    (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
  ) {
    age--;
  }
  return age;
});

export const User = mongoose.model("User", schema);
