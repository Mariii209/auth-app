require("dotenv").config({ debug: true });

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const authRoutes = require("./routes/authRoutes");

const PORT = process.env.PORT;

// CORS configuration
const corsOptions = {
  origin: "http://localhost:5173", // Replace with your frontend URL
  optionsSuccessStatus: 200,
};

// Enable CORS for all routes
app.use(cors(corsOptions));

// middleware
app.use(express.json());

// Serve static files from the "user-face" directory

// database connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(express.json());

app.get("*", (req, res) => {});

app.post("/api/auth/login", (req, res) => {});

app.use(authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
