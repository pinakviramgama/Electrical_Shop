import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import API from "../api/axios";
export default function SearchResults() {
  const [products, setProducts] = useState([]);
  const location = useLocation();

    const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get("q");

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await API.get("/products");

      const filtered = res.data.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
      );

      setProducts(filtered);
    };

    if (query) fetchProducts();
  }, [query]);

  return (
      <div className="container mt-5">
          <button onClick={() => { navigate(-1) }} className="btn btn-success">Back</button>
      <h4 className="mb-4">
        Results for: <span className="text-primary">{query}</span>
      </h4>

      <div className="row">
        {products.length > 0 ? (
          products.map(p => (
            <div key={p._id} className="col-12 col-sm-6 col-md-4 mb-4">
              <div className="card shadow border-0 rounded-4 h-100">
                <Link to={`/product/${p._id}`}>
                  <img
                    src={p.images[0]}
                    alt={p.name}
                    className="card-img-top"
                    style={{ height: "230px", objectFit: "cover" }}
                  />
                </Link>
                <div className="card-body">
                  <h5>{p.name}</h5>
                  <h6 className="text-success">₹ {p.price}</h6>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
}