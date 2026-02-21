import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: String,
  qty: Number,
  rate: Number,
});

const invoiceSchema = new mongoose.Schema(
  {
    invoiceNo: { type: String, required: true },
    customerName: String,
    mobile: String,
    items: [itemSchema],
    totalAmount: Number,
  },
  { timestamps: true },
);

export default mongoose.model("Invoice", invoiceSchema);
