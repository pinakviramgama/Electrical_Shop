import express from "express";
import {
  createBill,
  deleteBill,
  getAllBills,
  getSingleBill,
  updateBill,
} from "../controllers/billController.js";

const router = express.Router();

// app.use("/api/products", productRoutes);
// app.use("/api/admin", adminRoutes);
// app.use("/api/category", categoryRoutes);
// app.use("/api/invoices", billRoutes);

router.post("/api/invoices/create", createBill);
router.put("/api/invoices/update/:id", updateBill);
router.get("/api/invoices/bills", getAllBills);
router.get("/api/invoices/bills/:id", getSingleBill);
router.delete("/api/invoices/:id", deleteBill);
export default router;
