import express from "express";
import {
  addCategory,
  deleteCategory,
} from "../controllers/categoryController.js";
import { adminOnly } from "../middleware/adminOnly.js"; // matches export
import Category from "../models/Category.js";

const router = express.Router();

// Add new category (admin only)
router.post("/add", addCategory);

// Fetch all categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find({});
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/delete/:name", adminOnly, deleteCategory);

export default router;
