import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

import adminRoutes from "./routes/adminRoutes.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();
const app = express();

// ES Module __dirname fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ CORS setup for deployed frontend
app.use(
  cors({
    origin: "https://electrical-shop-3.onrender.com", // frontend domain
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

// ✅ Handle preflight OPTIONS requests
app.options("*", cors());

// Body parser
app.use(express.json());

// API Routes
app.use("/api/products", productRoutes);
app.use("/api/admin", adminRoutes);

// Serve React build
app.use(express.static(path.join(__dirname, "../vite-project/dist")));

// Catch-all route
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../vite-project/dist/index.html"));
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Running on Port ${PORT}`));
