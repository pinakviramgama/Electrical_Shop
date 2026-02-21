import express from "express";
import {
  createBill,
  deleteBill,
  getAllBills,
  getSingleBill,
  updateBill,
} from "../controllers/billController.js";

const router = express.Router();

router.post("/create", createBill);
router.put("/update/:id", updateBill);
router.get("/bills", getAllBills);
router.get("/bills/:id", getSingleBill);
router.delete("/:id", deleteBill);
export default router;
