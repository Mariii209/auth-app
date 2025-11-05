import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/authRoutes.js";

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

// serve static files
app.use(express.static(path.join(__dirname, "user-face")));

// routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../user-face/dist/index.html"));
});

app.use(authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
