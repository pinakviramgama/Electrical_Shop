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

// ✅ Correct CORS setup at the very top
app.use(
  cors({
    origin: "https://electrical-shop-7.onrender.com", // frontend deployed URL
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  }),
);

app.use(express.json());

// Routes
app.use("/api/products", productRoutes);
app.use("/api/admin", adminRoutes);

// Serve frontend (static) - **after all API routes**
app.use(express.static(path.join(__dirname, "../vite-project/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../vite-project/dist/index.html"));
});

// MongoDB Connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Running on Port ${PORT}`));
