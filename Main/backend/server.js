import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import path from "path";

import adminRoutes from "./routes/adminRoutes.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

const app = express();

// =====================================================
// ✅ BODY PARSER
// =====================================================
app.use(express.json());

// =====================================================
// ✅ CORS FIX (Frontend + Localhost)
// =====================================================
const allowedOrigins = [
  "http://localhost:5173", // Local frontend
  "https://electrical-shop-8.onrender.com", // Render deployed frontend
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(
        new Error(`CORS Blocked ❌ Origin not allowed: ${origin}`),
      );
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);

// =====================================================
// ✅ API ROUTES
// =====================================================
app.use("/api/products", productRoutes);
app.use("/api/admin", adminRoutes);

// =====================================================
// ✅ SERVE FRONTEND ON RENDER (React Build)
// =====================================================

// IMPORTANT: Backend folder = Main/backend
// Frontend dist folder = Main/vite-project/dist

const __dirnamePath = path.resolve();

// ✅ Correct dist path
const distPath = path.join(__dirnamePath, "../vite-project/dist");

console.log("✅ Serving Frontend from:", distPath);

// Serve React static files
app.use(express.static(distPath));

// React Router fallback
app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

// =====================================================
// ✅ MONGODB CONNECTION
// =====================================================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log("MongoDB Error ❌", err));

// =====================================================
// ✅ START SERVER
// =====================================================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
