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

// ✅ Fix __dirname for ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

// ✅ API Routes
app.use("/api/products", productRoutes);
app.use("/api/admin", adminRoutes);

// ✅ Serve React Build
app.use(express.static(path.join(__dirname, "../vite-project/dist")));

// ✅ Express v5 Fix Wildcard Route
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../vite-project/dist/index.html"));
});

// MongoDB Connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log(err));

// Render Port Fix
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Running on Port ${PORT}`));
