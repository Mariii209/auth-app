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

app.listen(PORT, () => console.log(`Server running on ${PORT}`));

// 🧩 Fix for __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CORS configuration
const corsOptions = {
  origin: "http://localhost:5173", // frontend URL
  optionsSuccessStatus: 200,
  credentials: true, // allow cookies
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Mongo connected"))
  .catch((err) => console.error("Mongo error:", err));

// Test route
app.get("/", (req, res) => {
  res.send("Auth API is running ✅");
});

// auth routes
app.use("/api/auth", authRoutes);
