import User from "../models/User.js";

//handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { fullName: "", email: "", password: "" };

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

// Login controller
export const login_post = (req, res) => {
  const { email, password } = req.body;
  console.log(`email: ${email}, password: ${password}`);
  res.send("hello from login");
};

// Signup controller
export const signup_post = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    const user = await User.create({ fullName, email, password });
    res.status(201).json(user);
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};
