import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import dotenv from "dotenv";
import { pool } from "./config/db";

dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
pool.query("SELECT NOW()", (error) => {
  if (error) {
    console.error("Database connection failed:", error);
  } else {
    console.log("PostgreSQL connected successfully!");
  }
});

app.get("/api/health", (_req, res) => {
  res.json({
    message: "ImportHub API is running",
  });
});

app.listen(PORT, () => {
  console.log(`ImportHub API running on http://localhost:${PORT}`);
});