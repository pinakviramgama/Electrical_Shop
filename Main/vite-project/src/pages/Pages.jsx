import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";
import SearchBar from "./SearchBar";
import StyledInvoice from "./SimpleInvoice";
export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filterCategory, setFilterCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all products
 const fetchProducts = async () => {
  try {
    const res = await API.get("/api/products");
    setProducts(res.data);
  } catch (err) {
    console.log("FETCH ERROR:", err);
  }
};

const fetchCategories = async () => {
  try {
    const res = await API.get("/api/category");

    if (Array.isArray(res.data)) {
      setCategories(
        res.data
          .map(c => c.name)
          .filter(n => n.toLowerCase() !== "none")
      );
    }
  } catch (err) {
    console.log("CATEGORY FETCH ERROR:", err);
  }
};

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // Filtered products based on category AND search
  const filteredProducts = products.filter(p => {
    const matchesCategory = filterCategory === "All" || p.category === filterCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      {/* HERO SECTION */}
      <div className="bg-light py-5 border-bottom">
        <div className="container">
          <div className="row align-items-center text-center text-md-start">
            <div className="col-12 col-md-3 mb-4 mb-md-0 text-center">
              <img
                src="/logo.jpeg"
                alt="Logo"
                className="img-fluid rounded-4 shadow"
                style={{ maxWidth: "180px" }}
              />
            </div>

            <div className="col-12 col-md-6 mb-4 mb-md-0 text-center">
              <h1 className="fw-bold display-6">
                Welcome to <br />
                <span className="text-primary">Bajrang Krupa Electricals & AC Services</span>
              </h1>
              <p className="text-secondary mt-3 fs-6">
                Fans • Mixers • Lights • Irons <br />
                All Electrical Items Available
              </p>
              <a
                href="#products"
                className="btn btn-primary px-4 py-2 mt-2 rounded-pill shadow-sm"
              >
                Explore Products 🚀
              </a>
            </div>

            <div className="col-12 col-md-3 text-center">
              <img
                src="/card.jpeg"
                alt="Banner"
                className="img-fluid rounded-4 shadow"
                style={{ maxWidth: "300px" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* PRODUCTS SECTION */}
      <div className="container mt-5" id="products">
        <h2 className="fw-bold mb-4 text-center">📦 Available Products</h2>


        <StyledInvoice
  data={{
    invoiceNo: 5,
    date: "20/02/2026",
    customerName: "Pinak Viramgama",
    mobile: "9924405374",
    items: [
      { name: "CPL 5pin Socket", qty: 1, rate: 35 },
      { name: "Opulus 12W Bulb", qty: 2, rate: 150 },
      { name: "Switch 5A", qty: 5, rate: 20 }
    ]
  }}
/>
        {/* COMBO SEARCH + FILTER BAR */}
        <div className="mb-4 d-flex flex-column flex-md-row align-items-center gap-2">
          <select
            className="form-select flex-shrink-0"
            style={{ width: "180px" }}
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>{cat}</option>
            ))}
          </select>

          <SearchBar/>

          {filterCategory !== "All" && (
            <button
              className="btn btn-outline-info flex-shrink-0"
              onClick={() => setFilterCategory("All")}
            >
              Clear Filter
            </button>
          )}
        </div>

        {/* PRODUCTS GRID */}
        <div className="row">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((p) => (
              <div key={p._id} className="col-12 col-sm-6 col-md-4 mb-4">
                <div className="card shadow border-0 rounded-4 h-100 product-card">
                  <Link to={`/product/${p._id}`}>
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      className="card-img-top rounded-top-4"
                      style={{
                        height: "230px",
                        objectFit: "cover",
                        backgroundColor: "#fff",
                      }}
                    />
                  </Link>

                  <div className="card-body d-flex flex-column">
                    <h5 className="fw-bold">{p.name}</h5>
                    <p className="text-muted small flex-grow-1">
                      {p.description.slice(0, 80)}...
                    </p>
                    <h5 className="fw-bold text-success">₹ {p.price}</h5>
                    <Link
                      to={`/product/${p._id}`}
                      className="btn btn-primary w-100 mt-2 rounded-pill"
                    >
                      View Details 🔍
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-muted fs-5">
              No products found
            </p>
          )}
        </div>
      </div>

      {/* CARD HOVER EFFECT */}
      <style>
        {`
          .product-card {
            transition: 0.3s ease;
          }
          .product-card:hover {
            transform: translateY(-6px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.15);
          }
        `}
      </style>
    </div>
  );
}