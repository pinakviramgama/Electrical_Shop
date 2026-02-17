import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/axios";
export default function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();


  const [product, setProduct] = useState(null);

  // ✅ Fetch Single Product
  const fetchProduct = async () => {
    try {
      const res = await API.get(`/products/${id}`);
        setProduct(res.data);
        console.log("Images:", product.images);

    } catch (error) {
      console.log("Error Fetching Product:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  if (!product) {
    return (
      <h3 className="text-center mt-5">Loading Product...</h3>
    );
  }

  return (
    <div className="container py-5">
      {/* ✅ Back Button */}
      <button
  className="btn btn-success mb-4"
  onClick={() => navigate(-1)}
>
  Back
</button>

      <div className="row">
        {/* ✅ LEFT SIDE (Images Carousel) */}
              <div className="col-md-6">
                  <div
  id="productCarousel"
  className="carousel slide"
                      data-bs-ride="carousel"
                       data-bs-wrap="false"
>
  {/* ✅ Indicators */}
  <div className="carousel-indicators">
    {product.images.map((_, index) => (
      <button
        key={index}
        type="button"
        data-bs-target="#productCarousel"
        data-bs-slide-to={index}
        className={index === 0 ? "active" : ""}
      ></button>
    ))}
  </div>

  {/* ✅ Images */}
  <div className="carousel-inner">
    {product.images.map((img, index) => (
      <div
        key={index}
        className={`carousel-item ${index === 0 ? "active" : ""}`}
      >
        <img
          src={img}
          className="d-block w-100"
          style={{
            height: "420px",
            objectFit: "contain",
            background: "#fff",
            padding: "20px",
          }}
          alt="product"
        />
      </div>
    ))}
  </div>

  {/* ✅ Controls */}
  {product.images.length > 1 && (
    <>
<button
  className="carousel-control-prev"
  type="button"
  data-bs-target="#productCarousel"
  data-bs-slide="prev"
>
  <span
    style={{
      fontSize: "35px",
      fontWeight: "bold",
      color: "black",
      background: "white",
      borderRadius: "50%",
      padding: "5px 15px",
    }}
  >
    ‹
  </span>
</button>

<button
  className="carousel-control-next"
  type="button"
  data-bs-target="#productCarousel"
  data-bs-slide="next"
>
  <span
    style={{
      fontSize: "35px",
      fontWeight: "bold",
      color: "black",
      background: "white",
      borderRadius: "50%",
      padding: "5px 15px",
    }}
  >
    ›
  </span>
</button>

    </>
  )}
</div>

        </div>

        {/* ✅ RIGHT SIDE (Product Details) */}
        <div className="col-md-6">
          <h2 className="fw-bold">{product.name}</h2>

          <h3 className="text-success mt-3">
            Price: ₹ {product.price}
          </h3>

          <p className="text-muted mt-4 fs-5">
            {product.description}
          </p>


                  <a
                    href="https://wa.me/919999999999"
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary w-100 mt-2 rounded-pill"
                  >
                    Buy on WhatsApp 🛒
                  </a>
        </div>
      </div>
    </div>
  );
}
