import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import API from "../api/axios";

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  // ✅ Images Array (Max 3)
  const [images, setImages] = useState([""]);

  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem("token");

  // ✅ Fetch Products
  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (err) {
      toast.error("Failed to load products ❌");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ✅ Add More Image Input (Max 3)
  const addMoreImage = () => {
    if (images.length < 3) {
      setImages([...images, ""]);
    } else {
      toast.error("Maximum 3 images allowed!");
    }
  };

  // ✅ Upload Image to Cloudinary
  const handleFileChange = async (index, e) => {
    const file = e.target.files[0];
    if (!file) return;

    toast.info("Uploading image...");

    try {
      const formData = new FormData();
      formData.append("file", file);

      // ✅ Your Cloudinary Upload Preset
      formData.append("upload_preset", "BajrangKrupa");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dkxyhi3z6/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (!data.secure_url) {
        toast.error("Upload failed ❌");
        return;
      }

      // ✅ Save Cloudinary URL in images array
      const updated = [...images];
      updated[index] = data.secure_url;
      setImages(updated);

      toast.success("Image Uploaded ✅");
    } catch (error) {
      toast.error("Cloudinary upload error ❌");
    }
  };

  // ✅ Add OR Update Product
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Remove empty images
    const filteredImages = images.filter((img) => img.trim() !== "");

    if (filteredImages.length === 0) {
      toast.error("Please upload at least 1 image ❌");
      return;
    }

    const productData = {
      name,
      price,
      description,
      images: filteredImages,
    };

    try {
      // ✅ Update Mode
      if (editId) {
        await API.put(`/products/update/${editId}`, productData, {
          headers: { Authorization: `Bearer ${token}` },
        });

        toast.success("Product Updated ✅");
        setEditId(null);
      }

      // ✅ Add Mode
      else {
        await API.post("/products/add", productData, {
          headers: { Authorization: `Bearer ${token}` },
        });

        toast.success("Product Added ✅");
      }

      // Reset Form
      setName("");
      setPrice("");
      setDescription("");
      setImages([""]);

      fetchProducts();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong ❌");
    }
  };

  // ✅ Delete Product
  const deleteProduct = async (id) => {
    try {
      await API.delete(`/products/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.error("Product Deleted ❌");
      fetchProducts();
    } catch (error) {
      toast.error("Delete failed ❌");
    }
  };

  // ✅ Edit Product
  const editProduct = (p) => {
    setEditId(p._id);
    setName(p.name);
    setPrice(p.price);
    setDescription(p.description);

    setImages(p.images.length > 0 ? p.images : [""]);
  };

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">Admin Dashboard</h2>

      <Link to="/" className="btn btn-success mb-4">
        Home
      </Link>

      {/* ✅ Add / Edit Form */}
      <div className="card shadow-sm p-4 rounded-4 mb-5">
        <h4 className="mb-3">
          {editId ? "✏️ Edit Product" : "➕ Add New Appliance"}
        </h4>

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            {/* Name */}
            <div className="col-md-6">
              <input
                className="form-control"
                placeholder="Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Price */}
            <div className="col-md-6">
              <input
                type="number"
                className="form-control"
                placeholder="Price ₹"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>

            {/* Description */}
            <div className="col-md-12">
              <input
                className="form-control"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            {/* ✅ Images Upload */}
            <div className="col-md-12">
              <h6 className="fw-bold">Product Images (Max 3)</h6>

              {images.map((img, index) => (
                <div key={index} className="mb-3">
                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    className="form-control"
                    onChange={(e) => handleFileChange(index, e)}
                  />

                  {/* Preview */}
                  {img && (
                    <img
                      src={img}
                      alt="preview"
                      className="mt-2 rounded"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                    />
                  )}
                </div>
              ))}

              {/* Add More */}
              {images.length < 3 && (
                <button
                  type="button"
                  className="btn btn-sm btn-outline-dark"
                  onClick={addMoreImage}
                >
                  ➕ Add Another Image
                </button>
              )}
            </div>
          </div>

          {/* Submit Button */}

   <div className="row mt-4 g-2">

  {/* Left Button */}
  <div className="col-md-6">
    <button
      className={`btn w-100 ${
        editId ? "btn-warning" : "btn-success"
      }`}
    >
      {editId ? "Update Product" : "Add Product"}
    </button>
  </div>

 <div className="col-md-6">
  {(name.length > 0 ||
    price.length > 0 ||
    description.length > 0 ||
    images.some((img) => img !== "")) && (
    <button
      onClick={() => {
        setName("");
        setPrice("");
        setDescription("");
        setImages([]);
      }}
      className="btn btn-danger w-100"
      type="button"
    >
      Cancel
    </button>
  )}
</div>

</div>


          {/* Cancel Edit */}
          {editId && (
            <button
              type="button"
              className="btn btn-secondary w-100 mt-2"
              onClick={() => {
                setEditId(null);
                setName("");
                setPrice("");
                setDescription("");
                setImages([""]);
              }}
            >
              Cancel Edit
            </button>
          )}
        </form>
      </div>

      {/* ✅ Product List */}
      <h4 className="mb-3">📦 All Products</h4>

      <div className="row">
        {products.map((p) => (
          <div key={p._id} className="col-md-4 mb-4">
            <div className="card shadow-sm h-100 rounded-4">
              <Link to={`/product/${p._id}`}>
                <img
                  src={p.images[0]}
                  className="card-img-top"
                  alt={p.name}
                  style={{
                    height: "220px",
                    objectFit: "contain",
                    padding: "15px",
                  }}
                />
              </Link>

              <div className="card-body">
                <h5>{p.name}</h5>
                <p className="text-muted">{p.description}</p>
                <h6 className="fw-bold">₹ {p.price}</h6>

                <button
                  className="btn btn-outline-primary w-100 mt-2"
                  onClick={() => editProduct(p)}
                >
                  Edit ✏️
                </button>

                <button
                  className="btn btn-danger w-100 mt-2"
                  onClick={() => deleteProduct(p._id)}
                >
                  Delete ❌
                </button>

                <Link
                  to={`/product/${p._id}`}
                  className="btn btn-dark w-100 mt-2"
                >
                  View Details 🔍
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
