import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import "./BillList.css";

export default function BillList() {
  const navigate = useNavigate();
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {
    try {
      const res = await API.get("/invoices/bills");
      console.log("Bills API response:", res.data);

      // ✅ Always ensure bills is an array
      if (Array.isArray(res.data)) {
        setBills(res.data);
      } else {
        setBills([]); // fallback if API returns error object
      }
    } catch (error) {
      console.error("Error fetching bills:", error);
      setBills([]); // fallback on error
    } finally {
      setLoading(false);
    }
  };

  /* ✅ DELETE BILL */
  const handleDeleteBill = async (id, e) => {
    e.stopPropagation();

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this bill?"
    );
    if (!confirmDelete) return;

    try {
      await API.delete(`/invoices/${id}`); // ✅ correct route

      setBills((prev) => prev.filter((bill) => bill._id !== id));
    } catch (error) {
      console.error("Delete error:", error);
      alert("Error deleting bill");
    }
  };

  if (loading) {
    return <p className="text-center mt-4">Loading bills...</p>;
  }

  return (
    <div className="container mt-4">
      <h3 className="fw-bold text-center mb-4">All Bills</h3>

      <button
        onClick={() => navigate(-1)}
        className="mb-4 btn btn-success"
      >
        Go Back
      </button>

      <div className="row">
        {Array.isArray(bills) && bills.map((bill) => (
          <div
            key={bill._id}
            className="col-lg-3 col-md-4 col-sm-6 mb-4"
          >
            <div
              className="card bill-card border-0 h-100 shadow-sm"
              onClick={() => navigate(`/bill/show/${bill._id}`)}
              style={{ cursor: "pointer" }}
            >
              <div className="card-body p-3">

                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="fw-bold text-primary small">
                    Invoice #{bill.invoiceNo}
                  </span>

                  <span className="badge bg-success">
                    ₹ {bill.totalAmount}
                  </span>
                </div>

                        {/* comment */}
                <h6 className="fw-semibold mb-1">
                  {bill.customerName}
                </h6>

                <p className="text-muted small mb-1">
                  📞 {bill.mobile}
                </p>

                <p className="text-muted small mb-3">
                  {new Date(bill.createdAt).toLocaleDateString()}
                </p>

                <button
                  className="btn btn-sm btn-danger w-100"
                  onClick={(e) => handleDeleteBill(bill._id, e)}
                >
                  Delete
                </button>

              </div>
            </div>
          </div>
        ))}
      </div>

      {Array.isArray(bills) && bills.length === 0 && (
        <p className="text-center mt-4">No bills found.</p>
      )}
    </div>
  );
}
