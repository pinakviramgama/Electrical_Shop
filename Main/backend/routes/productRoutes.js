import express from "express";
import {
  addProduct,
  deleteProduct,
  getProducts,
} from "../controllers/productController.js";
import Product from "../models/Product.js";

import { updateProduct } from "../controllers/productController.js";
import { adminOnly } from "../middleware/adminOnly.js";

const router = express.Router();

// Public
router.get("/", getProducts);

// Admin Only
router.post("/add", adminOnly, addProduct);
router.delete("/delete/:id", adminOnly, deleteProduct);
router.put("/update/:id", adminOnly, updateProduct);
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ msg: "Product Not Found" });

    res.json(product);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

export default router;
