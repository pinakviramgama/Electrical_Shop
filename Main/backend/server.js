import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import path from "path";

import adminRoutes from "./routes/adminRoutes.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();
const app = express();

// ✅ Body Parser
app.use(express.json());

// ✅ CORS Setup
app.use(
  cors({
    origin: ["http://localhost:5173", "https://electrical-shop-8.onrender.com"],
    credentials: true,
  }),
);

// ✅ API Routes
app.use("/api/products", productRoutes);
app.use("/api/admin", adminRoutes);

// ======================================================
// ✅ Serve Frontend on Render
// ======================================================

const __dirname = path.resolve();

// Serve React/Vite dist folder
app.use(express.static(path.join(__dirname, "vite-project/dist")));

// React routing fix
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "vite-project/dist/index.html"));
});

// ======================================================
// ✅ MongoDB Connection
// ======================================================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log("MongoDB Error ❌", err));

// ======================================================
// ✅ Start Server
// ======================================================

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
