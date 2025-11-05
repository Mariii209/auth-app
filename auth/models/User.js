import mongoose from "mongoose";
import validator from "validator";
const { isEmail } = validator;

// User Schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Password must be at least 6 characters long"],
  },
});

const User = mongoose.model("user", userSchema);

export default User;
