import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/axios";
import StyledInvoice from "./SimpleInvoice";
export default function BillDetail() {
  const { id } = useParams();
  const [bill, setBill] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchBill = async () => {
      try {
        const res = await API.get(`/invoices/bills/${id}`);
        setBill(res.data);
      } catch (err) {
        console.error("Error fetching bill:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBill();
  }, [id]);

  if (loading) {
    return <p className="text-center mt-4">Loading invoice...</p>;
  }

  if (!bill) {
    return <p className="text-center mt-4 text-danger">Bill not found</p>;
  }

   return (
    <div>
      <div className="container mt-3">
        <button
          onClick={() => navigate(-1)}
          className="btn btn-success mb-3"
        >
          Go Back
        </button>
      </div>

      <StyledInvoice bill={bill} />
    </div>
  );
}