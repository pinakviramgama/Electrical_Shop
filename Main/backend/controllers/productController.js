import Product from "../models/Product.js";

// ✅ Public: Get All Products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

// ✅ Admin: Add Product
export const addProduct = async (req, res) => {
  try {
    const { name, price, description, images } = req.body;

    // ✅ Basic Validation
    if (!name || !price || !description) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // ✅ Price Validation
    if (isNaN(price)) {
      return res.status(400).json({
        message: "Price must be a number",
      });
    }

    // ✅ Images Validation
    if (!images || images.length === 0) {
      return res.status(400).json({
        message: "At least 1 image is required",
      });
    }

    if (images.length > 3) {
      return res.status(400).json({
        message: "Only 3 images allowed per product",
      });
    }

    // ✅ Create Product
    const product = await Product.create({
      name,
      price,
      description,
      images,
    });

    res.status(201).json({
      message: "Product added successfully ✅",
      product,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error while adding product",
    });
  }
};

// ✅ Admin: Delete Product
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    res.json({ message: "Product Deleted ❌" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};

// ✅ Admin: Update Product
export const updateProduct = async (req, res) => {
  try {
    const { name, price, description, images } = req.body;

    // ✅ Price Validation
    if (price && isNaN(price)) {
      return res.status(400).json({
        message: "Price must be a number",
      });
    }

    // ✅ Max 3 Images Rule in Update Also
    if (images && images.length > 3) {
      return res.status(400).json({
        message: "Only 3 images allowed per product",
      });
    }

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        price,
        description,
        images,
      },
      { new: true },
    );

    res.json({
      message: "Product updated successfully ✏️",
      updated,
    });
  } catch (err) {
    res.status(500).json({
      message: "Update failed",
    });
  }
};
