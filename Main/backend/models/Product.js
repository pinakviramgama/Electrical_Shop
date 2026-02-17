import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,

  images: {
    type: [String],
    validate: [
      (val) => val.length <= 3,
      "Maximum 3 images allowed per product",
    ],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Product", productSchema);
