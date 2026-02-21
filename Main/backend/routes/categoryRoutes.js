import express from "express";
import {
  addCategory,
  deleteCategory,
} from "../controllers/categoryController.js";
import { adminOnly } from "../middleware/adminOnly.js"; // matches export
import Category from "../models/Category.js";

const router = express.Router();

// app.use("/api/products", productRoutes);
// app.use("/api/admin", adminRoutes);
// app.use("/api/category", categoryRoutes);
// app.use("/api/invoices", billRoutes);

// Add new category (admin only)
router.post("/api/category/add", adminOnly, addCategory);

// Fetch all categories
router.get("/api/category", async (req, res) => {
  try {
    const categories = await Category.find({});
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/api/category/delete/:name", adminOnly, deleteCategory);

export default router;
