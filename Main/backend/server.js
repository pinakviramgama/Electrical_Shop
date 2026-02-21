import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import path from "path";

import adminRoutes from "./routes/adminRoutes.js";
import billRoutes from "./routes/billRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();
const app = express();

// ✅ Body Parser
app.use(express.json());

// ✅ CORS Setup (allow local dev + deployed frontend)
const allowedOrigins = [
  "http://localhost:5173", // local React dev
  "https://electrical-shop-10.onrender.com", // deployed frontend URL
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("CORS not allowed"));
    },
    credentials: true,
  }),
);

// ✅ API Routes
app.use("/api/products", productRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/invoices", billRoutes);

// ✅ MongoDB Connect
console.log(process.env.MONGO_URI);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.error("MongoDB Error ❌", err));

// ✅ Serve Frontend Build in Production
const __dirnamePath = path.resolve();
const distPath = path.join(__dirnamePath, "../vite-project/dist");
app.use(express.static(distPath));

// ✅ Frontend catch-all (must be AFTER API routes)
app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

// ✅ Global Error Handling
app.use((err, req, res, next) => {
  console.error("Global Error:", err);
  res.status(500).json({ message: err.message || "Server error" });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
