import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import path from "path";

import adminRoutes from "./routes/adminRoutes.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

const app = express();
const __dirname = path.resolve();

// ✅ Body Parser
app.use(express.json());

// ✅ CORS Setup
app.use(
  cors({
    origin: [
      "http://localhost:5173", // local frontend
      "https://electrical-shop-8.onrender.com", // deployed frontend/backend same domain
    ],
    credentials: true,
  }),
);

// ✅ API Routes
app.use("/api/products", productRoutes);
app.use("/api/admin", adminRoutes);

// ======================================================
// ✅ SERVE FRONTEND BUILD (Render Fullstack Hosting)
// ======================================================

// Serve React/Vite build folder
app.use(express.static(path.join(__dirname, "dist")));

// Any route not API goes to React
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
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
