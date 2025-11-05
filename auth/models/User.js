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

//fire a function before doc is saved to db
userSchema.pre("save", function (next) {
  console.log("User about to be created & saved", this);
  next();
});

//fire a function after doc is saved to db
userSchema.post("save", function (doc, next) {
  console.log("New user was created & saved", doc);
  next();
});

const User = mongoose.model("user", userSchema);

export default User;
