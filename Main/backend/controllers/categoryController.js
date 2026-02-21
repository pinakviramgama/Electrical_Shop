import Category from "../models/Category.js";
// Add a new category
export const addCategory = async (req, res) => {
  try {
    const { name } = req.body;

    // Validate input
    if (!name || !name.trim()) {
      return res.status(400).json({ message: "Category name is required" });
    }

    // Check if category already exists
    const existing = await Category.findOne({ name: name.trim() });
    if (existing) {
      return res.status(400).json({ message: "Category already exists" });
    }

    // Create new category
    const category = await Category.create({ name: name.trim() });

    return res.status(201).json(category); // send back the created category
  } catch (err) {
    console.error("Add Category Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

import Product from "../models/Product.js";

export const deleteCategory = async (req, res) => {
  const { name } = req.params;

  try {
    if (name === "none") {
      return res
        .status(400)
        .json({ message: "Cannot delete default category" });
    }

    // Reassign all products in this category to "None"
    await Product.updateMany({ category: name }, { category: "none" });

    // Delete the category
    await Category.findOneAndDelete({ name });

    res
      .status(200)
      .json({ message: "Category deleted ✅ and products reassigned to None" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
