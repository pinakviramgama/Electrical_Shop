import Bill from "../models/Bill.js";

export const createBill = async (req, res) => {
  try {
    const { customerName, mobile, items } = req.body;

    // Count existing bills
    const count = await Bill.countDocuments();

    const totalAmount = items.reduce(
      (sum, item) => sum + item.qty * item.rate,
      0,
    );

    const bill = await Bill.create({
      invoiceNo: count + 1,
      customerName,
      mobile,
      items,
      totalAmount,
    });

    res.status(201).json(bill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBill = async (req, res) => {
  try {
    const { id } = req.params;
    const { customerName, mobile, items } = req.body;

    const totalAmount = items.reduce(
      (sum, item) => sum + item.qty * item.rate,
      0,
    );

    const updatedBill = await Bill.findByIdAndUpdate(
      id,
      {
        customerName,
        mobile,
        items,
        totalAmount,
      },
      { new: true },
    );

    res.json(updatedBill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllBills = async (req, res) => {
  try {
    const bills = await Bill.find().sort({ createdAt: -1 });
    res.json(bills);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// GET SINGLE BILL
export const getSingleBill = async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id);
    if (!bill) return res.status(404).json({ message: "Bill not found" });
    res.json(bill);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteBill = async (req, res) => {
  try {
    const deletedBill = await Bill.findByIdAndDelete(req.params.id);

    if (!deletedBill) {
      return res.status(404).json({ message: "Bill not found" });
    }

    res.json({ message: "Bill deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
