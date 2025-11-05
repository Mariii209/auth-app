import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
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
