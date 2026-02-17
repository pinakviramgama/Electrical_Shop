import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";

export default function Home() {
  const [products, setProducts] = useState([]);

  // Fetch all products (Public)
  const fetchProducts = async () => {
    const res = await API.get("/products");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>

      <div className="bg-light text-center py-5 border-bottom">
        <h1 className="fw-bold display-5">
          Welcome to Bajrang Krupa Electricals ⚡
        </h1>

        <p className="fs-5 text-secondary mt-2">
          Fans • Mixers • Lights • Irons • All Electrical Items
        </p>

        <a
          href="#products"
          className="btn btn-primary px-5 py-2 mt-3 rounded-pill shadow"
        >
          Explore Products 🚀
        </a>
      </div>


      <div className="container mt-5" id="products">
        <h2 className="fw-bold mb-4 text-center">
          📦 Available Products
        </h2>

        <div className="row">
          {products.map((p) => (
            <div key={p._id} className="col-md-4 mb-4">
              <div className="card shadow-lg border-0 rounded-4 h-100">
                {/* Product Image */}
                <Link to={`/product/${p._id}`} >
                        <img
  src={p.images[0]}
  alt={p.name}
  className="card-img-top rounded-top-4"
  style={{
    height: "230px",
    objectFit: "contain",
    backgroundColor: "#fff",
    padding: "10px"
  }}
/>
                </Link>



                {/* Product Details */}
                <div className="card-body d-flex flex-column">
                  <h5 className="fw-bold">{p.name}</h5>

                  <p className="text-muted small flex-grow-1">
                    {p.description}
                  </p>

                  <h5 className="fw-bold text-success">
                    ₹ {p.price}
                  </h5>

                  {/* WhatsApp Buy Button */}

                  <Link
                              to={`/product/${p._id}`}
                              className="btn btn-primary w-100 mt-2"
                            >
                              View Details 🔍
                            </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* If No Products */}
        {products.length === 0 && (
          <p className="text-center text-muted fs-5">
            No products added yet...
          </p>
        )}
      </div>
    </div>
  );
}
