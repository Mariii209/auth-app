import User from "../models/User.js";

export const login_post = (req, res) => {
  const { email, password } = req.body;
  console.log(`email: ${email}, password: ${password}`);
  res.send("hello from login");
};

export const signup_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.create({ email, password });
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};
