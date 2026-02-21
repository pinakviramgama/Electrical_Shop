import Product from "../models/Product.js";

// ✅ Public: Get All Products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.log("FETCH PRODUCTS ERROR:", err);

    res.status(500).json({
      message: err.message,
    });
  }
};

// ✅ Admin: Add Product
export const addProduct = async (req, res) => {
  try {
    console.log("BODY RECEIVED:", req.body);

    let { name, price, wholeSalePrice, description, images, category } =
      req.body;

    // ✅ Validation
    if (!name || !price || !wholeSalePrice || !description) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // ✅ Convert numbers
    price = Number(price);
    wholeSalePrice = Number(wholeSalePrice);

    if (isNaN(price) || isNaN(wholeSalePrice)) {
      return res.status(400).json({
        message: "Price must be a valid number",
      });
    }

    // ✅ Images Validation
    if (!images || images.length === 0) {
      return res.status(400).json({
        message: "At least 1 image is required",
      });
    }

    if (images.length > 4) {
      return res.status(400).json({
        message: "Only 4 images allowed per product",
      });
    }

    // ✅ Create Product
    const product = await Product.create({
      name,
      price,
      wholeSalePrice,
      description,
      images,
      category,
    });

    res.status(201).json({
      message: "Product added successfully ✅",
      product,
    });
  } catch (err) {
    console.log("ADD PRODUCT ERROR:", err);

    res.status(500).json({
      message: err.message,
    });
  }
};

// ✅ Admin: Delete Product
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    res.json({ message: "Product Deleted ❌" });
  } catch (err) {
    console.log("DELETE ERROR:", err);

    res.status(500).json({
      message: err.message,
    });
  }
};

// ✅ Admin: Update Product
export const updateProduct = async (req, res) => {
  try {
    let { name, price, wholeSalePrice, description, images, category } =
      req.body;

    // ✅ Convert price if present
    if (price) price = Number(price);

    if (price && isNaN(price)) {
      return res.status(400).json({
        message: "Price must be a valid number",
      });
    }

    if (images && images.length > 4) {
      return res.status(400).json({
        message: "Only 4 images allowed per product",
      });
    }

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        price,
        wholeSalePrice,
        description,
        images,
        category,
      },
      { new: true },
    );

    res.json({
      message: "Product updated successfully ✏️",
      updated,
    });
  } catch (err) {
    console.log("UPDATE ERROR:", err);

    res.status(500).json({
      message: err.message,
    });
  }
};
