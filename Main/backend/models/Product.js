import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
    },

    wholeSalePrice: {
      type: Number,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    images: {
      type: [String],
      required: true,
    },
    category: { type: String, required: true },
  },
  { timestamps: true },
);

export default mongoose.model("Product", productSchema);
