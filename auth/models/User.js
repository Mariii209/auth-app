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

  confirmPassword: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function (value) {
        return value === this.password;
      },
      message: "Passwords do not match",
    },
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
  // only run if password was modified or new
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSaltSync(10);
  this.password = await bcrypt.hash(this.password, salt);
  this.confirmPassword = undefined;
  next();
});

//fire a function after doc is saved to db
userSchema.post("save", function (doc, next) {
  console.log("New user was created & saved", doc);
  next();
});

//static method to login user
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

//create a model
const User = mongoose.model("user", userSchema);

export default User;
