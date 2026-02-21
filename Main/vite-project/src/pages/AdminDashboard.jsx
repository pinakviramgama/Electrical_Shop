import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import API from "../api/axios";

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [wholeSalePrice, setWholeSalePrice] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([""]);
  const [editId, setEditId] = useState(null);
  const [open, setOpen] = useState(false);
  const [addProduct, setAddProduct] = useState(false);
  const [showCategory, setShowCategory] = useState(false);

  const fileRefs = useRef([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // 🔹 Trigger re-fetch to re-render everything
  const [refresh, setRefresh] = useState(false);

  // Fetch products
  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      toast.error("Failed to load products ❌");
      setProducts([]);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await API.get("/category");
      setCategories(res.data.map(c => c.name));
    } catch (err) {
      toast.error("Failed to load categories ❌");
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [refresh]);

  // Add / Edit Product
  const handleSubmit = async (e) => {
    e.preventDefault();
    const filteredImages = images.filter(img => img.trim() !== "");
    if (filteredImages.length === 0) return toast.error("Please upload at least 1 image ❌");

    const categoryToSend = selectedCategory.trim() === "" ? "none" : selectedCategory;
    const productData = { name, price, category: categoryToSend, wholeSalePrice, description, images: filteredImages };

    try {
      if (editId) {
        await API.put(`/products/update/${editId}`, productData, { headers: { Authorization: `Bearer ${token}` } });
        toast.success("Product Updated ✅");
        setAddProduct(!addProduct);
      } else {
        await API.post("/products/add", productData, { headers: { Authorization: `Bearer ${token}` } });
        toast.success("Product Added ✅");
      }
      resetForm();
      setRefresh(prev => !prev); // 🔹 trigger full re-render
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong ❌");
    }
  };

  const deleteProduct = async (id) => {
    try {
      await API.delete(`/products/delete/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      toast.error("Product Deleted ❌");
      setRefresh(prev => !prev); // 🔹 trigger full re-render
    } catch (error) {
      toast.error("Delete failed ❌");
    }
  };

  const editProduct = (p) => {
    setEditId(p._id);
    setName(p.name);
    setPrice(p.price);
    setWholeSalePrice(p.wholeSalePrice);
    setDescription(p.description);
    setImages(p.images.length > 0 ? p.images : [""]);
    fileRefs.current.forEach(input => input && (input.value = ""));
    setAddProduct(true);
  };

  const addCategory = async () => {
    if (!category.trim()) return;
    try {
      const res = await API.post("/category/add", { name: category.trim() }, { headers: { Authorization: `Bearer ${token}` } });
      setCategory("");
      setOpen(false);
      toast.success("Category added ✅");
      setRefresh(prev => !prev); // 🔹 trigger full re-render
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add category ❌");
    }
  };

  const deleteCategory = async (catName) => {
    if (catName === "None") return toast.error("Cannot delete default category ❌");
    try {
      await API.delete(`/category/delete/${catName}`, { headers: { Authorization: `Bearer ${token}` } });
      if (selectedCategory === catName) setSelectedCategory("none");
      toast.success("Category deleted and products moved to None ✅");
      setRefresh(prev => !prev); // 🔹 trigger full re-render
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete category ❌");
    }
  };

  const addMoreImage = () => {
    if (images.length < 4) setImages([...images, ""]);
    else toast.error("Maximum 4 images allowed!");
  };

  const handleFileChange = async (index, e) => {
    const file = e.target.files[0];
    if (!file) return;
    toast.info("Uploading image...");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "BajrangKrupa");
      const res = await fetch("https://api.cloudinary.com/v1_1/dkxyhi3z6/image/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (!data.secure_url) return toast.error("Upload failed ❌");
      const updated = [...images];
      updated[index] = data.secure_url;
      setImages(updated);
      toast.success("Image Uploaded ✅");
    } catch {
      toast.error("Cloudinary upload error ❌");
    }
  };

  const resetForm = () => {
    setName(""); setPrice(""); setWholeSalePrice(""); setDescription(""); setImages([""]); setEditId(null);
    fileRefs.current.forEach(input => input && (input.value = ""));
  };

  // 🔹 Filter products
  const filteredProducts = filterCategory === "All" ? products : products.filter(p => p.category === filterCategory);

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">Admin Dashboard</h2>
      <Link to="/" className="btn btn-success mb-4">Home</Link>

      {/* Category Management */}
      <div className="card shadow-sm p-4 rounded-4 mb-5">

        <div className="d-flex justify-content-start">
  <button
    onClick={() => setOpen(!open)}
    className="mb-3 btn btn-sm btn-primary px-3"
    style={{ width: "auto" }}
  >
    Add Category
          </button>
        </div>

                {open && (
          <div>
            <input value={category} onChange={(e) => setCategory(e.target.value)} className="form-control" type="text" placeholder="Enter Category" />
            <button onClick={addCategory} className="m-3 btn btn-success">Add</button>
            <button onClick={() => { setOpen(false); setCategory(""); }} className="btn btn-danger">Cancel</button>
          </div>
        )}

        <div className="d-flex justify-content-start">
          <button className="mb-3 btn btn-sm btn-primary px-3" onClick={() => setShowCategory(!showCategory)} >Show All Cateogries</button>
        </div>

        {showCategory && (
  <ul className="mb-3 list-group w-50">

    {categories.length === 1 && (
      <li className="list-group-item text-center text-muted">
        No categories yet
      </li>
    )}

    {categories.map((cat, index) =>
      cat.toLowerCase() !== "none" && (
        <li
          key={index}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          {cat}
          <button
            className="btn btn-sm btn-danger"
            onClick={() => deleteCategory(cat)}
          >
            Delete
          </button>
        </li>
      )
    )}

  </ul>
)}

        <div className="d-flex justify-content-start">
          <button
            className="mb-3 btn btn-sm btn-primary px-3"
            onClick={() => {
                if (addProduct) {
                  resetForm();
                }
            setAddProduct(!addProduct);
            }}>
            {addProduct ? "Close Form ❌" : "Add New Product ➕"}
          </button>
        </div>

        <div className="mb-3 d-flex justify-content-start">
          <button onClick={()=>navigate("/bill")} className="btn btn-sm btn-primary">Generate Bill</button>
        </div>

          <div className="d-flex justify-content-start">
          <button onClick={()=>navigate("/bill/show")} className="btn btn-sm btn-primary">See Bills</button>
        </div>

      </div>


      {/* Add/Edit Product Form */}
      {addProduct && <div className="card shadow-sm p-4 rounded-4 mb-5">
        <h4 className="mb-3">{editId ? "✏️ Edit Product" : "➕ Add New Appliance"}</h4>
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6"><input className="form-control" placeholder="Product Name" value={name} onChange={e => setName(e.target.value)} required /></div>
            <div className="col-md-6"><input type="number" className="form-control" placeholder="Whole-Sale Price ₹" value={wholeSalePrice} onChange={e => setWholeSalePrice(e.target.value)} required /></div>
            <div className="col-md-6"><input type="number" className="form-control" placeholder="Price For Customer ₹" value={price} onChange={e => setPrice(e.target.value)} required /></div>
            <div className="col-md-12"><input className="form-control" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required /></div>
            <div className="col-md-12">
              <p className="text-success">Default category will be none if not selected</p>
              <select className="form-select w-50 shadow-sm" value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
                <option value="none">None</option>
                {categories.map((cat, index) => cat.toLowerCase() !== "none" && <option key={index} value={cat}>{cat}</option>)}
              </select>
            </div>
            <div className="col-md-12">
              <h6 className="fw-bold">Product Images (Max 4)</h6>
              {images.map((img, index) => (
                <div key={index} className="mb-3">
                  <input type="file" accept="image/*" className="form-control" ref={el => fileRefs.current[index] = el} onChange={e => handleFileChange(index, e)} />
                  {img && <img src={img} alt="preview" className="mt-2 rounded" style={{ width: "100px", height: "100px", objectFit: "cover" }} />}
                </div>
              ))}
              {images.length < 4 && <button type="button" className="btn btn-sm btn-outline-dark" onClick={addMoreImage}>➕ Add Another Image</button>}
            </div>
          </div>
          <div className="row mt-4 g-2">
            <div className="col-md-6"><button className={`btn w-100 ${editId ? "btn-warning" : "btn-success"}`}>{editId ? "Update Product" : "Add Product"}</button></div>
            <div className="col-md-6"><button type="button" className="btn btn-danger w-100" onClick={resetForm}>Cancel</button></div>
          </div>
        </form>
      </div>}

      {/* Category Filter */}
      <h3 className="mb-2">Select Category</h3>
      <div className="mb-3" style={{ width: "20%" }}>
        <select className="form-select" value={filterCategory} onChange={e => setFilterCategory(e.target.value)}>
          <option value="All">All Categories</option>
          {categories.map((cat, idx) => cat !== "none" && <option key={idx} value={cat}>{cat}</option>)}
        </select> <br />

        {filterCategory !== "All" && (
            <button
              className="btn btn-info flex-shrink-0"
              onClick={() => setFilterCategory("All")}
            >
              Clear Filter
            </button>
          )}
      </div>

      {/* Filtered Products */}
      <h4 className="mb-3">📦 Products</h4>
      <div className="row">
        {filteredProducts.length === 0 ? <p>No products found 😢</p> : filteredProducts.map(p => (
          <div key={p._id} className="col-md-4 mb-4">
            <div className="card shadow-sm h-100 rounded-4">
              <Link to={`/product/${p._id}`}>
                <img src={p.images?.[0]} className="card-img-top" alt={p.name} style={{ height: "220px", objectFit: "contain", padding: "15px" }} />
              </Link>
              <div className="card-body">
                <h5>{p.name}</h5>
                <p className="fw-bold text-success">{p.description}</p>
                <h6 className="fw-bold">MRP : ₹ {p.price}</h6>
                {token && <p className="fw-bold">Whole-Sale Price: {p.wholeSalePrice}</p>}
                <p className="fw-bold text-success">Category: {p.category}</p>
                <button className="btn btn-outline-primary w-100 mt-2" onClick={() => editProduct(p)}>Edit ✏️</button>
                <button className="btn btn-danger w-100 mt-2" onClick={() => deleteProduct(p._id)}>Delete ❌</button>
                <button className="btn btn-dark w-100 mt-2" onClick={() => navigate(`/product/${p._id}`)}>View Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
