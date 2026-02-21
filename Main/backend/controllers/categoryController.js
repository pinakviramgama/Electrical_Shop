import Category from "../models/Category.js";
import Product from "../models/Product.js";
// Add a new category
export const addCategory = async (req, res) => {
  console.log("BODY RECEIVED:", req.body); // 🔹 debug
  try {
    const { name } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({ message: "Category name is required" });
    }
    const existing = await Category.findOne({ name: name.trim() });
    if (existing)
      return res.status(400).json({ message: "Category already exists" });

    const category = await Category.create({ name: name.trim() });
    return res.status(201).json(category);
  } catch (err) {
    console.error("Add Category Error:", err); // 🔹 debug full error
    return res.status(500).json({ message: "Server error" });
  }
};

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
