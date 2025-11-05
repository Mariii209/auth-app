export const login_post = (req, res) => {
  const { email, password } = req.body;
  console.log(`email: ${email}, password: ${password}`);
  res.send("hello from login");
};

export const signup_post = (req, res) => {
  const { email, password } = req.body;
  console.log(`email: ${email}, password: ${password}`);
  res.send("hello from signup");
};
