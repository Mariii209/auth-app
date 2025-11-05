import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
const { isEmail } = validator;

// User Schema
const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Please enter your full name"],
    minlength: [2, "Full name must be at least 2 characters long"],
    trim: true,
    validate: {
      validator: function (value) {
        return value.split(" ").length >= 2; // must have at least first & last name
      },
      message: "Please enter your full first and last name",
    },
  },
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

//Capitalize full name before saving to db
userSchema.pre("save", function (next) {
  this.fullName = this.fullName
    .split(" ")
    .map((name) => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase())
    .join(" ");
  next();
});

//Hash password before saving to db
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSaltSync();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//fire a function after doc is saved to db
userSchema.post("save", function (doc, next) {
  console.log("New user was created & saved", doc);
  next();
});

//create a model
const User = mongoose.model("user", userSchema);

export default User;
