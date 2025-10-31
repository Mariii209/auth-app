const express = require("express");
const app = express();

const PORT = process.env.PORT;

app.get("/api/auth/signup", (req, res) => {
  console.log("Signup route accessed log");
  res.send("hello from signup");
});

app.listen(PORT);
