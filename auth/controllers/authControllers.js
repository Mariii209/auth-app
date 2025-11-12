import { json } from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

//handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { fullName: "", email: "", password: "", confirmPassword: "" };

  //confirm password errors
  if (err.message.includes("Passwords do not match")) {
    errors.confirmPassword = "Passwords do not match";
    return errors;
  }

  //duplicate error code
  if (err.code === 11000) {
    errors.email = "that email is already registered";
    return errors;
  }

  //validation errors
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

//create json web token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: `${process.env.JWT_EXPIRES_IN}s`,
  });
};

// Login controller
export const login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: process.env.JWT_EXPIRES_IN * 1000,
    });
    res.status(200).json({ user: user._id, message: "Login successful" });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

// Signup controller
export const signup_post = async (req, res) => {
  const { fullName, email, password, confirmPassword } = req.body;

  try {
    const user = await User.create({
      fullName,
      email,
      password,
      confirmPassword,
    });
    const token = createToken(user._id);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: process.env.JWT_EXPIRES_IN * 1000,
    });
    res
      .status(201)
      .json({ user: user._id, message: "User created successfully" });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};
