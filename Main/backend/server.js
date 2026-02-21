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

// ✅ CORS Setup
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  }),
);

// ✅ API Routes
app.use("/api/products", productRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/invoices", billRoutes);
// ✅ MongoDB Connect FIX
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log("MongoDB Error ❌", err));

// ✅ Serve Frontend Build Correctly
const __dirnamePath = path.resolve();
const distPath = path.join(__dirnamePath, "../vite-project/dist");

app.use(express.static(distPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
