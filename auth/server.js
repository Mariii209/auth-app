import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";

// Initialize environment variables

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// 🧩 Fix for __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CORS configuration
const corsOptions = {
  origin: "http://localhost:5173", // frontend URL
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() =>
    app.listen(PORT || 8000, () => {
      console.log(`Server is running on port ${PORT}`);
    })
  )
  .catch((err) => console.error("MongoDB connection error:", err));

// serve static files
app.use(express.static(path.join(__dirname, "user-face")));

// serve index.html for root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../user-face/dist/index.html"));
});

// auth routes
app.use(authRoutes);

//cookie parser
app.get("/set-cookie", (req, res) => {
  res.cookie("newUser", false);
  res.cookie("isLoggedIn", true, {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
  });
  res.send("Cookie has been set");
});

app.get("/read-cookie", (req, res) => {
  const cookies = req.cookies;
  console.log(cookies);

  res.json(cookies);
});
